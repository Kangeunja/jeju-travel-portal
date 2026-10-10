import { NextResponse } from "next/server";
import { JEJU_BUS_CONFIG } from "@/constants/bus";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function GET() {
  // console.log("Next.js API Route가 정상적으로 호출되었습니다!");
  const stationId = JEJU_BUS_CONFIG.STATION_ID_AIRPORT;

  const url = `http://bus.jeju.go.kr/api/searchArrivalInfoList.do?station_id=${stationId}`;
  // console.log(url);

  try {
    const response = await fetch(url, {
      next: { revalidate: 30 },
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("API Route 원인 로그:", error.message || error);
    return NextResponse.json(
      { error: "데이터를 불러오는 중 에러가 발생했습니다." },
      { status: 500 },
    );
  }
}
