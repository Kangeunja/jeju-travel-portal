import { NextResponse } from "next/server";

export async function GET(request: Request) {
  //   console.log("🚀 [/api/jeju] 요청이 성공적으로 들어왔습니다!");

  const { searchParams } = new URL(request.url);
  // console.log("searchParams>>>", searchParams);

  const category = searchParams.get("category") || "c1";
  // console.log("category>>>", category);

  const apiKey = process.env.VISIT_JEJU_API_KEY?.trim() || "";

  let targetUrl = `https://api.visitjeju.net/vsjApi/contents/searchList?apiKey=${apiKey}&locale=kr&page=1&category=${category}`;

  try {
    const response = await fetch(targetUrl, {
      next: { revalidate: 30 },
    });

    if (!response.ok) throw new Error(`API 응답 에러: ${response.status}`);

    const data = await response.json();
    // console.log("data>>>>>>", data);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "데이터를 불러오는 중 에러가 발생했습니다." },
      { status: 500 },
    );
  }
}
