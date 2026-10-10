"use client";

import { CALL_CENTER_NUMBER, CITY_TOUR_BUS_LINK } from "@/constants/transport";
import { BusArrivalInfo, getBus600ArrivalInfo } from "@/lib/api/busApi";
import { getJejuWeather } from "@/lib/api/weatherApi";
import { getBaseDateTime } from "@/utils/dateFormatter";
import parseWeatherData, {
  getSafetyAlerts,
  getSkyStatus,
} from "@/utils/weather";
import Link from "next/link";
import { useEffect, useState } from "react";

const LOCATION_LIST = [
  { name: "제주시", nx: 52, ny: 38 },
  { name: "서귀포", nx: 52, ny: 33 },
  { name: "중산간", nx: 53, ny: 35 },
];

interface RegionWeather {
  name: string;
  temp: string;
  text: string;
  emoji: string;
}

export interface SafetyItem {
  name: string;
  status: string;
  // isOk: boolean;
}

interface SafetyStatusResult {
  badgeText: string;
  badgeClass: string;
  items: SafetyItem[];
}

export default function RealtimeInfoWidget() {
  const [weatherData, setWeatherData] = useState<RegionWeather[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [safetyData, setSafetyData] = useState<SafetyStatusResult | null>(null);
  const [busInfo, setBusInfo] = useState<BusArrivalInfo | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true);
        const { baseDate, baseTime } = getBaseDateTime();

        const responses = await Promise.all(
          LOCATION_LIST.map((location) =>
            getJejuWeather({
              baseDate,
              baseTime,
              nx: location.nx,
              ny: location.ny,
            }),
          ),
        );

        const parsedData = responses.map((res, index) => {
          const items = res.response.body.items.item;
          const parsed = parseWeatherData(items);
          const sky = getSkyStatus(parsed.rainType);

          const wsdItem = items.find((item: any) => item.category === "WSD"); // 풍속
          const rn1Item = items.find((item: any) => item.category === "RN1"); // 강수량

          const wsd = wsdItem ? parseFloat(wsdItem.obsrValue) : 0;
          const rn1 = rn1Item ? parseFloat(rn1Item.obsrValue) : 0;

          const result = getSafetyAlerts(wsd, rn1);
          setSafetyData(result);

          return {
            name: LOCATION_LIST[index].name,
            temp: parsed.temp,
            emoji: sky.emoji,
            text: sky.text,
          };
        });

        setWeatherData(parsedData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  useEffect(() => {
    async function fetchBusData() {
      setLoading(true);
      const data = await getBus600ArrivalInfo();

      setBusInfo(data);
    }

    fetchBusData();
  }, []);

  return (
    <div className="w-300 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-25">
      {/* 실시간 제주 날씨 Card */}
      <article className="bg-white rounded-2xl p-5 border border-gray-300 shadow-sm hover:shadow-md transition-shadow">
        <header className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
            <span className="text-xl" role="img" aria-label="해">
              {/* {weatherData?.emoji} */}
            </span>
            실시간 제주 날씨
          </h3>
          <span className="text-xs text-gray-400 font-medium">LIVE</span>
        </header>

        <ul className="space-y-2.5 text-sm text-gray-700">
          {weatherData.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between bg-gray-50/80 px-3 py-2 rounded-xl"
            >
              <span className="font-medium text-gray-600">{item.name}</span>
              <span className="font-bold text-gray-900 flex items-center gap-1.5">
                {item?.temp}℃
                <span className="text-xs font-normal text-amber-500">
                  {item?.emoji} {item?.text}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </article>

      {/* 제주 안전/통제 알림 Card */}
      <article className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <header className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
            {/* <span className="text-xl" role="img" aria-label="경고">
              ⚠️
            </span> */}
            제주 안전/통제 알림
          </h3>
          <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
            {safetyData?.badgeText}
          </span>
        </header>

        <ul className="space-y-2 text-sm text-gray-700">
          {safetyData?.items.map((item) => (
            <li key={item.name} className="flex items-start gap-2 p-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
              <p className="flex-1">
                <strong className="font-semibold text-gray-900">
                  {`${item.name}: `}
                </strong>
                {item.status}
              </p>
            </li>
          ))}
        </ul>
      </article>

      {/* 3. 주요 대중교통/안내 Card */}
      <article className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1">
        <header className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
            <span className="text-xl" role="img" aria-label="버스">
              🚌
            </span>
            주요 대중교통/안내
          </h3>
          <span className="text-xs text-gray-400 font-medium">안내</span>
        </header>

        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-center justify-between p-1.5">
            <span className="font-medium text-gray-800">공항버스 (600번)</span>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
              {busInfo?.arrivalText}
            </span>
          </li>
          <li className="flex items-center justify-between p-1.5">
            <span className="font-medium text-gray-800">제주시티투어버스</span>
            <Link href={CITY_TOUR_BUS_LINK}></Link>
            <a
              href={CITY_TOUR_BUS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-blue-600 underline"
            >
              노선 안내
            </a>
          </li>
          <li className="flex items-center justify-between pt-2 border-t border-dashed border-gray-100">
            <span className="font-medium text-gray-600">관광안내 콜센터</span>
            <a
              href={`tel:${CALL_CENTER_NUMBER}`}
              className="font-bold text-amber-600 hover:underline"
            >
              ☎ 120
            </a>
          </li>
        </ul>
      </article>
    </div>
  );
}
