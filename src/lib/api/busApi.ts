import { JEJU_BUS_CONFIG } from "@/constants/bus";

export interface BusArrivalInfo {
  routeNum: string;
  predictTime: number; // 남은 시간
  remainCount: number; // 남은 정류장 수
  arrivalText: string; // 화면 표시용 텍스트 예)5분 후 도착
}
export async function getBus600ArrivalInfo(): Promise<BusArrivalInfo | null> {
  try {
    const res = await fetch("/api/bus");
    if (!res.ok) throw new Error("버스 도착 정보 조회 실패");

    const data = await res.json();
    // console.log("버스 정보 데이터>>>>>>", data);

    const bus600 = data.find((item: any) => {
      console.log(item);
      return item.ROUTE_ID === JEJU_BUS_CONFIG.ROUTE_ID_600;
    });
    // console.log(bus600);

    if (!bus600) {
      return {
        routeNum: "600",
        predictTime: 0,
        remainCount: 0,
        arrivalText: "운행 정보 없음",
      };
    }

    return {
      routeNum: bus600.ROUTE_NUM || 0,
      predictTime: bus600.PREDICT_TRAV_TM || 0,
      remainCount: bus600.REMAIN_STATION_COUNT || 0,
      arrivalText: `${bus600.PREDICT_TRAV_TM}분 후 도착`,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
