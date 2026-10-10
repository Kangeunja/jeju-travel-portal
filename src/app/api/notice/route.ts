import { NextResponse } from "next/server";

export async function GET() {
  const noticeList = [
    {
      id: 1,
      title: "2026년 한라산 탐방예약 시스템 개편 안내",
      date: "2026.03.15",
      isNew: true,
    },
    {
      id: 2,
      title: "입산 통제구간 및 안전 수칙 안내",
      date: "2026.03.10",
      isNew: false,
    },
    {
      id: 3,
      title: "제주 여행 할인 쿠폰 이벤트 당첨자 발표",
      date: "2026.03.02",
      isNew: false,
    },
  ];

  return NextResponse.json(noticeList);
}
