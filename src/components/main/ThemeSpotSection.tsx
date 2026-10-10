import { useEffect, useState } from "react";

const tabs = [
  { id: "nature", label: "자연/명소", contentscd: "c1" },
  { id: "food", label: "맛집/카페", contentscd: "c4" },
  { id: "hotel", label: "추천숙소", contentscd: "c3" },
  { id: "activity", label: "쇼핑", contentscd: "c2" },
] as const;

interface current {
  id: number;
  imgSrc: string;
  title: string;
  address: string;
  phone: string;
  tag: string;
  contentsid: string;
}

export default function ThemeSpotSection() {
  const [selectedCategory, setselectedCategory] = useState<string>(
    tabs[0].contentscd,
  );
  const [currentItems, setCurrentItems] = useState<current[]>([]);

  const [likedList, setLikedList] = useState<number[]>([]);

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const res = await fetch(`/api/jeju?category=${selectedCategory}`);
        const data = await res.json();
        // console.log(data);
        const result = data.items;

        setCurrentItems(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPlaces();
  }, [selectedCategory]);

  const getImageUrl = (item: any) => {
    const path = item.repPhoto?.photoid.imgpath;
    return path;
  };

  const formatTags = (tagString: string) => {
    return tagString
      .split(/,|\s+/)
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)
      .map((tag) => {
        return tag.startsWith("#") ? tag : `#${tag}`;
      });
  };

  return (
    <div className="w-300 mb-25">
      <h2 className="text-[20px]  text-gray-900 mb-2.5">
        취향대로 골라보는 제주
      </h2>

      <div className="flex items-center gap-2 md:gap-4 mb-10 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setselectedCategory(tab.contentscd)}
            className={`px-5 py-2.5 rounded-full text-sm md:text-base font-medium transition-all shrink-0 cursor-pointer ${
              selectedCategory === tab.contentscd
                ? "bg-gray-900 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.slice(0, 3).map((item, index) => {
          const itemKey = item.id || `spot-${index}`;
          const isLiked = likedList.includes(item.id);
          const imageUrl = getImageUrl(item);
          const tags = formatTags(item.tag);

          return (
            <div
              key={itemKey}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
            >
              <div className="group relative h-60 w-full overflow-hidden bg-gray-100">
                <img
                  src={imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <button
                  type="button"
                  aria-label="찜하기"
                  className="absolute bottom-3 right-3 z-20 p-2.5 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm shadow-md transition-all active:scale-90 cursor-pointer"
                >
                  <svg
                    className={`w-5 h-5 transition-colors 
                    ${
                      isLiked
                        ? "text-red-500 fill-red-500"
                        : "text-gray-600 fill-none"
                    }
                  `}
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.575-4.683-4.575-2.112 0-3.886 1.258-4.317 3.037-.431-1.779-2.205-3.037-4.317-3.037C5.099 3.675 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </button>

                <div className="absolute inset-0 bg-black/70 text-white p-5 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 backdrop-blur-[2px]">
                  <p className="text-xs text-orange-300 font-semibold mb-1">
                    상세 주소
                  </p>
                  <p className="text-sm font-medium mb-3 line-clamp-2">
                    {item.address}
                  </p>

                  {/* <p className="text-xs text-gray-300 font-semibold mb-1">
                    전화번호
                  </p>
                  <p className="text-sm font-medium mb-5">{item.phone}</p> */}

                  <a
                    href={`/spot/${item.contentsid}`}
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white text-xs md:text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow"
                  >
                    상세보기 &gt;
                  </a>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={`${itemKey}-tag-${index}`}
                        className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <a
          href="/spots"
          className="inline-flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold px-6 py-3.5 rounded-xl border border-gray-200 transition-all hover:shadow-sm"
        >
          <span>더 많은 관광지 찾아보기 (공공데이터 3,000+건 전체보기)</span>
          <span className="text-orange-500 font-bold"></span>
        </a>
      </div>
    </div>
  );
}
