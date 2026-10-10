import { spotItems } from "@/constants/spot";
import { fetchJejuTourSpots } from "@/lib/api/tourSpotApi";
import Image from "next/image";

type Props = {
  searchParams: Promise<{ cat3?: string; keyword?: string }>;
};

export default async function MustVisitJejuDetailPage({ searchParams }: Props) {
  const { cat3, keyword } = await searchParams;

  const spotList = await fetchJejuTourSpots({ cat3, keyword });

  const currentTheme = spotItems.find((item) => item.cat3 === cat3);
  const isRankingTheme = currentTheme?.isRanking ?? false;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 text-center sm:text-left">
          <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full mb-3">
            {currentTheme?.title}
          </span>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-3xl">
            {currentTheme?.title} {currentTheme?.subtitle}
          </h1>

          <p className="text-slate-500 text-sm mt-2">
            제주도 구석구석 꼭 가봐야 할 특별한 장소들을 확인해보세요.
          </p>
        </div>

        {spotList.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-slate-400 text-base">
              해당 테마의 추천 명소를 준비 중입니다.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {spotList.map((item, index) => {
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col"
                >
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={
                        item.firstimage ??
                        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop"
                      }
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {isRankingTheme ? (
                      <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                        TOP {index + 1}
                      </div>
                    ) : (
                      <div className="absolute top-3 left-3 bg-emerald-600/90 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-lg">
                        {currentTheme?.subtitle}
                      </div>
                    )}

                    {/* <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-700 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
                      {item?.addr1.split(" ")}
                    </div> */}
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h2 className="font-bold text-xl text-slate-800 group-hover:text-emerald-600 transition-colors line-clamp-1">
                        {item?.title}
                      </h2>

                      <p className="text-slate-500 text-sm mt-2 line-clamp-2 leading-relaxed">
                        {item?.addr1 || "상세 주소 정보가 제공되지 않습니다."}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
