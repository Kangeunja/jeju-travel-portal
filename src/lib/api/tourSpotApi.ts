import { parseTourSpotItems } from "@/lib/schemas/tourSpot.schema";
import type { JejuSpotsQueryParams, TourSpotItem } from "@/types/tourSpot";

function buildTourApiUrl({
  cat3,
  keyword,
  pageNo = 1,
  numOfRows = 5,
}: JejuSpotsQueryParams): string | null {
  const apiKey = process.env.TOUR_JEJU_API_KEY;
  if (!apiKey) {
    throw new Error("TOUR_JEJU_API_KEY가 설정되지 않았습니다.");
  }

  // const base = "https://apis.data.go.kr/B551011/KorService2";
  const common = new URLSearchParams({
    // serviceKey: apiKey,
    numOfRows: String(numOfRows),
    pageNo: String(pageNo),
    MobileOS: "ETC",
    MobileApp: "JejuPortal",
    _type: "json",
    areaCode: "39",
    arrange: "B",
  });

  if (cat3) common.append("cat3", cat3);
  if (keyword) common.append("keyword", keyword);

  const baseUrl = keyword
    ? "https://apis.data.go.kr/B551011/KorService2/searchKeyword2"
    : "https://apis.data.go.kr/B551011/KorService2/areaBasedList2";

  const fullUrl = `${baseUrl}?serviceKey=${apiKey}&${common.toString()}`;

  return fullUrl;
}

/** 서버 전용: 한국관광공사 API 직접 호출 */
export async function fetchJejuTourSpots(
  params: JejuSpotsQueryParams,
): Promise<TourSpotItem[]> {
  const url = buildTourApiUrl(params);

  if (!url) {
    return [];
  }

  const response = await fetch(url, {
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error(`Tour API 응답 에러: ${response.status}`);
  }

  const data: unknown = await response.json();

  if (typeof data !== "object" || data === null) {
    console.error("API가 올바른 JSON 객체를 반환하지 않았습니다:", data);
    return [];
  }

  try {
    return parseTourSpotItems(data);
  } catch (error) {
    return [];
  }
  // return parseTourSpotItems(data);
}

/** 클라이언트 전용: Next.js BFF `/api/spot` 호출 */
export async function fetchJejuSpotsFromApi(params: JejuSpotsQueryParams) {
  const searchParams = new URLSearchParams();

  if (params.cat3) searchParams.set("cat3", params.cat3);
  if (params.keyword) searchParams.set("keyword", params.keyword);
  if (params.pageNo != null) {
    searchParams.set("pageNo", String(params.pageNo));
  }
  if (params.numOfRows != null) {
    searchParams.set("numOfRows", String(params.numOfRows));
  }

  const res = await fetch(`/api/spot?${searchParams.toString()}`);

  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(body?.error ?? `관광지 목록 조회 실패: ${res.status}`);
  }

  const data = (await res.json()) as TourSpotItem[];
  return data;
}
