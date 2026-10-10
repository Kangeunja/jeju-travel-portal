import { spotItems } from "@/constants/spot";
import Link from "next/link";

export default function MustVisitJeju() {
  // useEffect(() => {
  //   async function fetchThemes() {
  //     try {
  //       setLoading(true);
  //       const query = `cat3=${selectedCard.cat3}`;
  //       const res = await fetch(`api/theme?${query}`);
  //       const data = await res.json();
  //       setItems(data.response.body.items.item);
  //     } catch (error) {
  //       console.error("테마 데이터를 불러오는 중 에러 발생:", error);
  //     }
  //   }
  //   fetchThemes();
  // }, []);

  return (
    <>
      <div className="flex flex-col items-center mb-25">
        <h2 className="text-[40px] md:text-3xl font-medium text-gray-900 tracking-tight mb-7">
          "지금 이 순간, 꼭 가봐야 할 제주"
        </h2>
        {/* <a
          href="#more"
          className="text-sm md:text-base font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
        >
          더보기 <span className="text-xs">&gt;</span>
        </a> */}

        <div className="w-300 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {spotItems.map((item) => (
            <Link
              key={item.id}
              href={`/place?cat3=${item.cat3}`}
              className="group relative h-80 w-full rounded-2xl overflow-hidden shadow-md cursor-pointer block"
            >
              {/* 배경 이미지 */}
              <img
                src={item.imgSrc}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />

              <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-4 text-center text-white">
                <h3 className="text-xl md:text-2xl font-bold tracking-tight drop-shadow-md">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm md:text-base font-medium text-gray-200 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out drop-shadow">
                  {item.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
