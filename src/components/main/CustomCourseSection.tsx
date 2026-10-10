import { useState } from "react";
import CourseMap from "./CourseMap";

// const courseData = {
//   "2박 3일": {
//     title: "2박 3일 알짜배기 동부 코스",
//     desc: "제주 동부의 핵심 명소만 알차게 모은 대표 입문 코스",
//     schedule: [
//       { day: "1일차", route: "제주공항 ➔ 함덕해수욕장 ➔ 동문시장" },
//       { day: "2일차", route: "성산일출봉 ➔ 섭지코지 ➔ 표선해변" },
//       { day: "3일차", route: "사려니숲길 ➔ 용두암 ➔ 공항" },
//     ],
//   },
//   당일치기: {
//     title: "하루 만에 즐기는 제주 핵심 코스",
//     desc: "짧고 굵게 알짜배기만 둘러보는 일정",
//     schedule: [
//       { day: "Day 1", route: "제주공항 ➔ 이호테우해변 ➔ 아르떼뮤지엄 ➔ 공항" },
//     ],
//   },
//   "3박 4일": {
//     title: "여유로운 제주 여늘 완주 코스",
//     desc: "동부부터 서부까지 느긋하게 즐기는 힐링 코스",
//     schedule: [
//       { day: "1일차", route: "제주공항 ➔ 애월해안도로 ➔ 협재해수욕장" },
//       { day: "2일차", route: "카멜리아힐 ➔ 중문관광단지 ➔ 주상절리" },
//       { day: "3일차", route: "성산일출봉 ➔ 섭지코지 ➔ 비밀의숲" },
//       { day: "4일차", route: "함덕해수욕장 ➔ 제주동문시장 ➔ 공항" },
//     ],
//   },
//   "혼자 여행": {
//     title: "혼자서도 뚜벅뚜벅 감성 코스",
//     desc: "대중교통 접근성이 높고 혼자 방문하기 좋은 코스",
//     schedule: [
//       { day: "1일차", route: "제주공항 ➔ 관덕정 ➔ 칠성로쇼핑거리" },
//       { day: "2일차", route: "세화해변 ➔ 종달리 시골마을 ➔ 독립서점 투어" },
//     ],
//   },
//   "가족/부모님": {
//     title: "부모님 만족 200% 편안한 힐링 코스",
//     desc: "동선 이동을 줄이고 산책하기 좋은 경승지 위주",
//     schedule: [
//       { day: "1일차", route: "제주공항 ➔ 한림공원 ➔ 오설록 티뮤지엄" },
//       { day: "2일차", route: "서귀포 치유의숲 ➔ 천지연폭포 ➔ 약천사" },
//     ],
//   },
// };

const courseData = {
  "2박 3일": {
    title: "2박 3일 알짜배기 동부 코스",
    desc: "제주 동부의 핵심 명소만 알차게 모은 대표 입문 코스",
    schedule: [
      {
        day: "1일차",
        places: [
          { name: "제주공항", lat: 33.5065, lng: 126.4931 },
          { name: "함덕해수욕장", lat: 33.5434, lng: 126.6692 },
          { name: "동문시장", lat: 33.5127, lng: 126.5284 },
        ],
      },

      {
        day: "2일차",
        places: [
          { name: "성산일출봉", lat: 33.4581, lng: 126.9426 },
          { name: "섭지코지", lat: 33.4241, lng: 126.9311 },
          { name: "표선해변", lat: 33.3248, lng: 126.8361 },
        ],
      },

      {
        day: "3일차",
        places: [
          { name: "사려니숲길", lat: 33.4077, lng: 126.6425 },
          { name: "용두암", lat: 33.5165, lng: 126.513 },
          { name: "제주공항", lat: 33.5065, lng: 126.4931 },
        ],
      },
    ],
  },
  당일치기: {
    title: "하루 만에 즐기는 제주 핵심 코스",
    desc: "짧고 굵게 알짜배기만 둘러보는 일정",
    schedule: [
      {
        day: "Day 1",
        places: [
          { name: "제주공항", lat: 33.5065, lng: 126.4931 },
          { name: "이호테우해변", lat: 33.4981, lng: 126.4529 },
          { name: "아르떼뮤지엄", lat: 33.397, lng: 126.346 },
          { name: "제주공항", lat: 33.5065, lng: 126.4931 },
        ],
      },
    ],
  },
  "3박 4일": {
    title: "여유로운 제주 여늘 완주 코스",
    desc: "동부부터 서부까지 느긋하게 즐기는 힐링 코스",
    schedule: [
      {
        day: "Day 1",
        places: [
          { name: "제주공항", lat: 33.5065, lng: 126.4931 },
          { name: "애월해안도로", lat: 33.4655, lng: 126.3204 },
          { name: "협재해수욕장", lat: 33.3938, lng: 126.2396 },
        ],
      },
      {
        day: "2일차",
        places: [
          { name: "카멜리아힐", lat: 33.2901, lng: 126.3802 },
          { name: "중문관광단지", lat: 33.2488, lng: 126.4124 },
          { name: "주상절리", lat: 33.2376, lng: 126.4253 },
        ],
      },
      {
        day: "3일차",
        places: [
          { name: "성산일출봉", lat: 33.4581, lng: 126.9426 },
          { name: "섭지코지", lat: 33.4241, lng: 126.9311 },
          { name: "비밀의숲", lat: 33.4442, lng: 126.7785 },
        ],
      },
      {
        day: "4일차",
        places: [
          { name: "함덕해수욕장", lat: 33.5434, lng: 126.6692 },
          { name: "제주동문시장", lat: 33.5127, lng: 126.5284 },
          { name: "제주공항", lat: 33.5065, lng: 126.4931 },
        ],
      },
    ],
  },
  "혼자 여행": {
    title: "혼자서도 뚜벅뚜벅 감성 코스",
    desc: "대중교통 접근성이 높고 혼자 방문하기 좋은 코스",
    schedule: [
      {
        day: "1일차",
        places: [
          { name: "제주공항", lat: 33.5065, lng: 126.4931 },
          { name: "관덕정", lat: 33.5135, lng: 126.5218 },
          { name: "칠성로쇼핑거리", lat: 33.5139, lng: 126.5262 },
        ],
      },
      {
        day: "2일차",
        places: [
          { name: "세화해변", lat: 33.5252, lng: 126.8524 },
          { name: "종달리 시골마을", lat: 33.5015, lng: 126.9038 },
          { name: "독립서점 투어(소심한책방)", lat: 33.5008, lng: 126.9031 },
        ],
      },
    ],
  },
  "가족/부모님": {
    title: "부모님 만족 200% 편안한 힐링 코스",
    desc: "동선 이동을 줄이고 산책하기 좋은 경승지 위주",
    schedule: [
      {
        day: "1일차",
        places: [
          { name: "제주공항", lat: 33.5065, lng: 126.4931 },
          { name: "한림공원", lat: 33.3892, lng: 126.2393 },
          { name: "오설록 티뮤지엄", lat: 33.3059, lng: 126.2895 },
        ],
      },
      {
        day: "2일차",
        places: [
          { name: "서귀포 치유의숲", lat: 33.2878, lng: 126.5273 },
          { name: "천지연폭포", lat: 33.2447, lng: 126.5596 },
          { name: "약천사", lat: 33.2441, lng: 126.4529 },
        ],
      },
    ],
  },
};

type TabType = keyof typeof courseData;

export default function CustomCourseSection() {
  const [selectedTab, setSelectedTab] = useState<TabType>("당일치기");
  const currentCourse = courseData[selectedTab];

  const categories = [
    "당일치기",
    "2박 3일",
    "3박 4일",
    "혼자 여행",
    "가족/부모님",
  ] as const;

  const allPlaces = currentCourse.schedule.flatMap((item) => item.places);

  return (
    <div className="w-300 mb-25">
      <h2 className="text-[20px]  text-gray-900 mb-2.5">
        제주가 처음이라면? 맞춤 코스 추천
      </h2>

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* 왼쪽 영역 */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-100 pb-4">
              {categories.map((tab) => {
                const isActive = selectedTab === tab;

                return (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                {currentCourse.title}
              </h3>
              <p className="text-sm text-gray-500">{currentCourse.desc}</p>
            </div>

            <div className="space-y-3 bg-gray-50/70 p-4 md:p-5 rounded-2xl border border-gray-100">
              {currentCourse.schedule.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2.5 py-1 rounded-md shrink-0 mt-0.5">
                    {item.day}
                  </span>
                  <p className="text-sm md:text-base font-medium text-gray-700 leading-relaxed">
                    {item.places.map((item) => item.name).join("➔")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4">
            <a
              href="/course"
              className="inline-flex items-center gap-2 text-sm md:text-base font-bold text-gray-800 hover:text-orange-500 transition-colors group"
            >
              <span>전체 추천 코스 및 지도 상세보기</span>
              <span className="group-hover:translate-x-1 transition-transform">
                ──&gt;
              </span>
            </a>
          </div>
        </div>

        {/* 오른쪽 영역 */}
        <div className="lg:col-span-5 flex flex-col min-h-[320px]">
          <div className="relative w-full h-full bg-slate-100 rounded-2xl border border-gray-200 overflow-hidden flex flex-col items-center justisfy-center p-4">
            <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm flex items-center gap-1.5 text-xs font-bold text-gray-700">
              <span>🗺️</span>
              <span>코스 지도 미니뷰</span>
            </div>

            <div className="w-full h-auto">
              <CourseMap places={allPlaces} />
            </div>

            {/* <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
              <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center mb-3 text-xl">
                📍
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">
                [ Kakao / Naver Map 영역 ]
              </p>
              <div className="inline-flex items-center gap-2 bg-white/80 px-3 py-1 rounded-full border border-gray-200 text-xs font-medium text-orange-600 shadow-2xs">
                <span>① 공항</span> ➔ <span>② 주요명소</span> ➔{" "}
                <span>③ 숙소</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
