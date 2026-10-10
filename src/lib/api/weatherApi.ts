interface WeatherParams {
  baseDate: string; // YYYYMMDD
  baseTime: string; // HHMM (시간)
  nx: number; // 제주시 격자 X
  ny: number; // 제주시 격자 Y
}

export async function getJejuWeather({
  baseDate,
  baseTime,
  nx,
  ny,
}: WeatherParams) {
  const baseUrl = process.env.NEXT_PUBLIC_WEATHER_BASE_URL;
  const rawApiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  if (!baseUrl || !rawApiKey) {
    throw new Error("API URL 또는 Service Key가 설정되지 않았습니다.");
  }

  const apiKey = decodeURIComponent(rawApiKey);

  const url = new URL(`${baseUrl}/getUltraSrtNcst`);

  url.searchParams.append("serviceKey", apiKey);
  url.searchParams.append("pageNo", "1");
  url.searchParams.append("numOfRows", "10");
  url.searchParams.append("dataType", "JSON");
  url.searchParams.append("base_date", baseDate);
  url.searchParams.append("base_time", baseTime);
  url.searchParams.append("nx", String(nx));
  url.searchParams.append("ny", String(ny));

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`날씨 API 호출 실패: ${res.status}`);
  }

  const data = await res.json();
  return data;
}
