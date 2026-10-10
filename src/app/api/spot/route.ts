import { fetchJejuTourSpots } from "@/lib/api/tourSpotApi";
import type { JejuSpotsQueryParams } from "@/types/tourSpot";
import { NextResponse } from "next/server";

/** @deprecated `fetchJejuTourSpots` 사용 권장 (서버 컴포넌트 호환용 re-export) */
export async function getSpots(params: JejuSpotsQueryParams) {
  try {
    return await fetchJejuTourSpots(params);
  } catch {
    return [];
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const cat3 = searchParams.get("cat3") ?? undefined;
  const keyword = searchParams.get("keyword") ?? undefined;
  const pageNo = searchParams.get("pageNo");
  const numOfRows = searchParams.get("numOfRows");

  if (!cat3 && !keyword) {
    return NextResponse.json(
      { error: "cat3 또는 keyword 쿼리 파라미터가 필요합니다." },
      { status: 400 },
    );
  }

  try {
    const items = await fetchJejuTourSpots({
      cat3,
      keyword,
      pageNo: pageNo ? Number(pageNo) : undefined,
      numOfRows: numOfRows ? Number(numOfRows) : undefined,
    });

    return NextResponse.json(items);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "데이터를 불러오는 중 에러가 발생했습니다.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
