import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.TOUR_JEJU_API_KEY;

  const url = `https://apis.data.go.kr/B551011/KorService2/searchFestival2?serviceKey=${apiKey}&numOfRows=3&pageNo=1&MobileOS=ETC&MobileApp=JejuPortal&_type=json&areaCode=39&eventStartDate=20250101&arrange=C`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 30 },
    });

    if (!response.ok) throw new Error(`API 응답 에러: ${response.status}`);

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "데이터를 불러오는 중 에러가 발생했습니다." },
      { status: 500 },
    );
  }
}
