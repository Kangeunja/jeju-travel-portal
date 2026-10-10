"use client";

import CustomCourseSection from "@/components/main/CustomCourseSection";
import FestivalSection from "@/components/main/FestivalSection";
import InfoNetworkSection from "@/components/main/InfoNetworkSection";
import MustVisitJeju from "@/components/main/MustVisitJeju";
import RealtimeInfoWidget from "@/components/main/RealtimeInfoWidget";
import ThemeSpotSection from "@/components/main/ThemeSpotSection";
import SearchBar from "@/components/main/SearchBar";
import { POPULAR_TAGS } from "@/constants/tag";

export default function HomePage() {
  return (
    <main className="w-full">
      <section className="relative w-full min-h-150 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
          style={{
            backgroundImage: `url('/img/main.png')`,
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 w-full flex flex-col items-center text-white">
          <p className="text-lg md:text-xl font-medium mb-2 tracking-wide text-white/90 drop-shadow">
            사계절 놓치지 말아야 할 제주관광
          </p>
          <h1 className="font-black-sans text-3xl md:text-5xl tracking-tight leading-tight drop-shadow-md mb-2.5">
            <span className="text-[#FFA500]">걷고 싶은</span> 계절,
            <span className="text-[#FFA500]">제주</span>의 매력을 탐하다
          </h1>

          {/* 1. 검색바 영역 */}
          <SearchBar />

          <div className="flex items-center justify-center gap-2 mt-6 text-sm">
            <span className="text-white/80 font-bold mr-1">인기키워드 :</span>
            {POPULAR_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                // onClick={() => handleTagClick(tag.replace("#", ""))}
                className="bg-white/20 hover:bg-white/40 text-white px-2.5 py-1 rounded-full text-xs transition backdrop-blur-md cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full px-4 flex flex-col items-center justify-center mt-15 mb-25">
        <RealtimeInfoWidget />
        <MustVisitJeju />
        <ThemeSpotSection />
        <CustomCourseSection />
        <FestivalSection />
        <InfoNetworkSection />
      </div>
    </main>
  );
}
