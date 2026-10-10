import Link from "next/link";
import { useEffect, useState } from "react";

interface festivalsType {
  id: number;
  firstimage: string;
  title: string;
  addr1: string;
  eventstartdate: string;
  eventenddate: string;
}

export default function FestivalSection() {
  const [festivals, setFestivals] = useState<festivalsType[]>([]);

  useEffect(() => {
    async function fetchFestival() {
      try {
        const res = await fetch("/api/festival");
        const data = await res.json();
        const result = data.response.body.items.item;
        setFestivals(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchFestival();
  }, []);

  const formatDate = (date: string) => {
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);

    return `${year}.${month}.${day}`;
  };

  return (
    <div className="w-300 mb-25">
      <div className="flex justify-between">
        <h2 className="text-[20px]  text-gray-900 mb-2.5">
          지금 제주에서는 무슨 일이?
        </h2>

        <Link
          href="/calendar"
          className="text-sm md:text-base font-semibold text-gray-500 hover:text-orange-500 transition-colors flex items-center gap-1 group shrink-0"
        >
          <span>전체 달력 보기</span>
          <span className="text-xs group-hover:translate-x-0.5 transition-transform">
            &gt;
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {festivals.map((item, index) => (
          <Link
            key={`festival-${index}`}
            href={`/festival/${item.id}`}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="relative h-52 w-full overflow-hidden bg-gray-100">
              <img
                src={item.firstimage}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

              <div className="absolute top-4 left-4 z-10">
                {/* <span
                  className={`${item.statusBg} text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm`}
                >
                  {item.status}
                </span> */}
              </div>
            </div>

            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-orange-500 transition-colors line-clamp-1 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 mb-3 flex items-center gap-1">
                  {/* <span>📍</span> */}
                  <span>{item.addr1}</span>
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs md:text-sm text-gray-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">📅</span>
                  <span>{`${formatDate(item.eventstartdate)} ~ ${formatDate(item.eventenddate)}`}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
