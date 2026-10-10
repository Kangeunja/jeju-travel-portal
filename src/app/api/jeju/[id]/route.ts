import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const apiKey = process.env.VISIT_JEJU_API_KEY?.trim() || "";

  const targetUrl = `https://api.visitjeju.net/vsjApi/contents/searchList?apiKey=${apiKey}&locale=kr&contentsid=${id}`;
  console.log(targetUrl);

  try {
    const response = await fetch(targetUrl, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) throw new Error(`API 응답 에러: ${response.status}`);

    const data = await response.json();

    const matchedItem = Array.isArray(data.items)
      ? data.items.find((item: any) => item.contentsid === id)
      : null;
    // console.log(matchedItem);
    return NextResponse.json(matchedItem);
  } catch (error) {
    return NextResponse.json(
      {
        error: "데이터를 불러오는 중 에러가 발생했습니다.",
      },
      {
        status: 500,
      },
    );
  }
}
