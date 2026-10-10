import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.JEJU_API_KEY;
  const targetUrl = `https://api.visitjeju.net/vsjApi/contents/itemList?authCode=${apiKey}&locale=kr`;

  try {
    const response = await fetch(targetUrl);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "데이터를 불러오는 중 에러가 발생했습니다." },
      { status: 500 },
    );
  }
}
