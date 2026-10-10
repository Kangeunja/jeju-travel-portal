import { supabase } from "@/lib/supabaseClient";
import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";

// 스키마 정의
export const spotSchema = {
  type: Type.OBJECT,
  properties: {
    summaryBadge: {
      type: Type.STRING,
      description: "상세페이지 상단 요약 뱃지문구 (20자 이내)",
    },
    richDescription: {
      type: Type.STRING,
      description: "상세페이지 메인에 보여줄 자연스럽고 풍부한 3-4줄 소개글",
    },
    infoBox: {
      type: Type.OBJECT,
      properties: {
        highlight: {
          type: Type.STRING,
          description:
            "핵심 특징 (맛집: 대표메뉴/분위기, 숙소: 뷰/편의시설, 자연/액티비티: 소요시간/난이도, 쇼핑: 대표상품)",
        },
        targetAudience: {
          type: Type.STRING,
          description: "추천 대상 (예: 가족여행, 연인, 혼자여행, 선물구매)",
        },
        locationType: {
          type: Type.STRING,
          description: "실내 / 실외 / 야외 구분",
        },
      },
      required: ["highlight", "targetAudience", "locationType"],
    },

    tags: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "핵심 태그 목록",
    },
    aiTip: {
      type: Type.STRING,
      description: "관광객을 위한 한 줄 AI 추천 팁",
    },
  },
  required: ["summaryBadge", "richDescription", "tags", "aiTip"],
};

export async function POST(req: Request) {
  let rawDataForFallback: any = null;

  try {
    const { rawData, categoryName } = await req.json();
    rawDataForFallback = rawData;

    // DB에서 가공된 캐시 데이터가 있는지 먼저 조회
    const { data } = await supabase
      .from("spot_augments")
      .select("*")
      .eq("contents_id", rawData.contentsid)
      .maybeSingle();

    if (data) {
      return NextResponse.json({
        success: true,
        data: {
          summaryBadge: data.summary_badge,
          richDescription: data.rich_description,
          infoBox: {
            highlight: data.highlight,
            targetAudience: data.target_audience,
            locationType: data.location_type,
          },
          tags: data.tags || [],
          aiTip: data.ai_tip,
        },
        cached: true,
      });
    }

    // const modelsList = await ai.models.list();
    // for await (const model of modelsList) {
    //   console.log(model.name);
    // }

    // Gemini API 호출 (데이터가 없을경우)
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: `다음은 제주 관광 API의 [${categoryName}] 카테고리 데이터야. 해당 카테고리의 특성에 맞춰 상세페이지 정형 JSON으로 분석/가공해줘:\n${JSON.stringify(rawData, null, 2)} `,
      config: {
        responseMimeType: "application/json",
        responseSchema: spotSchema,
        temperature: 0.7,
      },
    });

    const augmentedData = JSON.parse(response.text || "");
    console.log("augmentedData>>>>", augmentedData);

    // 원본 데이터 rawData를 spots 테이블 저장
    await supabase.from("spots").upsert({
      contents_id: rawData.contentsid,
      title: rawData.title || "제목 없음",
      category_name: categoryName || "관광지",
      address: rawData.address || "",
      introduction: rawData.introduction || "",
      updated_at: new Date().toISOString(),
    });

    // AI 가공 데이터 augmentedData를 spot_augments 테이블 저장
    const { error: upsertError } = await supabase.from("spot_augments").upsert({
      contents_id: rawData.contentsid,
      summary_badge: augmentedData.summaryBadge,
      rich_description: augmentedData.richDescription,
      highlight: augmentedData.infoBox?.highlight,
      target_audience: augmentedData.infoBox?.targetAudience,
      location_type: augmentedData.infoBox?.locationType,
      tags: augmentedData.tags || [],
      ai_tip: augmentedData.aiTip,
      model_version: "gemini-3.5-flash-lite",
      updated_at: new Date().toISOString(),
    });

    if (upsertError) {
      console.error("DB 저장 실패:", upsertError);
    } else {
      console.log("[DB Saved] DB 저장 완료");
    }

    return NextResponse.json({
      success: true,
      data: augmentedData,
      cached: false,
    });
  } catch (error) {
    console.error("❌ Gemini API 호출 중 에러 발생:", error);

    const fallbackData = {
      summary_badge: rawDataForFallback.title ?? "제주 추천 장소",
      richDescription:
        rawDataForFallback.introduction ??
        "상세 설명 정보는 방문 전 공식 안내를 참고해 주세요.",
      infoBox: {
        highlight: rawDataForFallback?.tag?.split(",")[0] ?? "제주 관광지",
        targetAudience: "모든 방문객",
        locationType: "기본 정보",
      },
      tags: rawDataForFallback?.alltag
        ? rawDataForFallback.alltag.split(",").slice(0, 5)
        : ["제주", "관광"],
      aiTip:
        "기본 안내: 현장 운영 상황에 따라 이용 정보가 달라질 수 있으니 사전 확인 권장합니다.",
      isFallback: true,
    };
    return NextResponse.json({
      success: true,
      data: fallbackData,
      cached: false,
      degraded: true,
    });
    // return NextResponse.json(
    //   { success: error, error: "Failed to process" },
    //   { status: 500 },
    // );
  }
}
