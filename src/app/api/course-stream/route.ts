import { supabase } from "@/lib/supabaseClient";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

function createStreamFromText(text: string): ReadableStream {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      controller.enqueue(
        encoder.encode(`data:${JSON.stringify({ text })}\n\n`),
      );
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
}

export async function POST(req: Request) {
  let normalizedKeyword = "";

  try {
    const { prompt } = await req.json();
    console.log(prompt);

    if (!prompt) {
      return NextResponse.json(
        { error: "검색 키워드를 입력해주세요." },
        { status: 400 },
      );
    }

    normalizedKeyword = prompt.trim().replace(/\s+/g, "");

    // DB에서 가공된 캐시 데이터가 있는지 먼저 조회
    const { data } = await supabase
      .from("course_caches")
      .select("content")
      .eq("keyword", normalizedKeyword)
      .maybeSingle();

    if (data?.content) {
      return new Response(createStreamFromText(data.content), {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
        },
      });
    }

    // Gemini API 호출
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const responseStream = await ai.models.generateContentStream({
      model: "gemini-3.5-flash-lite",
      contents: `당신은 제주도 여행 전문 AI 가이드입니다. 다음 요청 조건에 맞춰 일자별 추천 여행 코스를 상세히 작성해 주세요:\n\n요청 조건: ${prompt}
        [주의사항 및 출력 지침]:
        1. 일자별 코스, 장소별 상세 설명, 이동 팁, 추천 이유 등 **여행 관련 팁과 유용한 정보는 풍부하게 포함**해 주세요.
        2. 단, 답변 맨 마지막의 대화형 마무리 인사(예: "추가로 수정하고 싶은 코스나 궁금한 점이 있다면 언제든 말씀해 주세요", "즐거운 여행 되세요!") 문장만 제외하고 코스 리포트 내용으로 깔끔하게 마쳐주세요.
      `,
    });

    let fullTextAccumulator = "";

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of responseStream) {
            const text = chunk.text;
            if (text) {
              fullTextAccumulator += text;
              controller.enqueue(
                encoder.encode(`data:${JSON.stringify({ text })}\n\n`),
              );
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();

          if (fullTextAccumulator) {
            await supabase.from("course_caches").upsert({
              keyword: normalizedKeyword,
              content: fullTextAccumulator,
              created_at: new Date().toISOString(),
            });
          }
        } catch (error) {
          controller.error(error);
        }
      },
    });

    // 실시간 SSE 스트리밍 반환
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    const fallbackCourse = `
    # 🌴 [제주 인기 대표 추천 코스]
    *현재 AI 코스 생성 서비스가 혼잡하여 인기 대표 코스를 먼저 안내해 드립니다.*

    ### 🚗 [1일차] 제주 동부 핵심 투어
    - **오전:** 함덕 서우봉 해변 산책 및 오션뷰 카페 휴식
    - **점심:** 성산일출봉 근처 싱싱한 보말칼국수 식사
    - **오후:** 성산포항 출발, 우도 입도 후 섬 속의 섬 전기차 투어

    ### 🚗 [2일차] 제주 남부 힐링 코스
    - **오전:** 서귀포 천지연 폭포 및 정방폭포 관람
    - **점심:** 서귀포 올레시장 맛집 탐방 (흑돼지 강정, 모닥치기)
    - **오후:** 중문 색달해변 산책 및 산방산 탄산온천 휴식

    ---
    *잠시 후 다시 시도해 주시면 입력하신 키워드에 맞는 맞춤형 AI 코스를 만들어 드립니다.*
    `;
    return new Response(createStreamFromText(fallbackCourse), {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  }
}
