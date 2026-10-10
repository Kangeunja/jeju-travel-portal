export interface ParsedWeather {
  temp: string; // 기온
  humidity: string; // 습도
  rainType: string; // 강수형태
}

export interface WeatherItem {
  category: string;
  obsrValue: string;
}

export default function parseWeatherData(items: WeatherItem[]) {
  const result: ParsedWeather = {
    temp: "",
    humidity: "",
    rainType: "",
  };

  items.forEach((item) => {
    if (item.category === "T1H") result.temp = item.obsrValue;
    if (item.category === "REH") result.humidity = item.obsrValue;
    if (item.category === "PTY") result.rainType = item.obsrValue;
  });

  return result;
}

export function getSkyStatus(ptyCode: string) {
  switch (ptyCode) {
    case "0":
      return { text: "맑음", emoji: "☀️" };
    case "1":
      return { text: "비", emoji: "🌧️" };
    case "2":
      return { text: "비/눈", emoji: "🌧️/❄️" };
    case "3":
      return { text: "눈", emoji: "❄️" };
    case "5":
      return { text: "빗방울", emoji: "🌦️" };
    default:
      return { text: "맑음", emoji: "☀️" };
  }
}

export function getSafetyAlerts(wsdNum: number, rn1Num: number) {
  const isWindy = wsdNum >= 14;
  const isHeavyRain = rn1Num >= 10;
  const isRestricted = isWindy || isHeavyRain;

  return {
    badgeText: isRestricted ? "통제 / 주의" : "정상 운행",
    badgeClass: isRestricted
      ? "bg-red-100 text-red-600"
      : "bg-emerald-100 text-emerald-600",
    items: [
      {
        name: "한라산 정상",
        status: isWindy
          ? "강풍 입산 통제"
          : isHeavyRain
            ? "호우 입산 통제"
            : "탐방 가능",
      },
      {
        name: "협재 해수욕장",
        status: isRestricted ? "입수 통제" : "입수 가능",
      },
      {
        name: "12시 배편",
        status: isRestricted ? "풍랑 주의보 결항" : "정상 운항",
      },
    ],
  };
}
