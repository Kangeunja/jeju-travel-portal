import { partnerList } from "@/constants/partners";
import Link from "next/link";
import { useEffect, useState } from "react";

interface infoType {
  id: number;
  title: string;
  date: string;
  isNew: boolean;
}

export default function InfoNetworkSection() {
  const [info, setInfo] = useState<infoType[]>([]);

  useEffect(() => {
    async function fetchNotices() {
      try {
        const res = await fetch("/api/notice");
        const data = await res.json();
        // console.log("data>>", data);
        setInfo(data);
      } catch (error) {
        console.error("데이터 로드 실패", error);
      }
    }
    fetchNotices();
  }, []);

  return (
    <div className="w-300 grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">📢</span>
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                공지사항
              </h3>
            </div>

            <Link
              href="/notice"
              className="text-xs md:text-sm text-gray-400 hover:text-gray-700 transition-colors"
            >
              전체보기 +
            </Link>
          </div>

          <ul className="space-y-3">
            {info.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/notice/${item.id}`}
                  className="flex items-center justify-between group py-1"
                >
                  <div className="flex items-center gap-2 overflow-hidden pr-4">
                    <span className="text-gray-300 text-xs shrink-0">•</span>
                    <span className="text-sm md:text-base text-gray-700 group-hover:text-orange-500 font-medium truncate transition-colors">
                      {item.title}
                    </span>
                    {item.isNew && (
                      <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0">
                        N
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 shrink-0 font-light">
                    {item.date}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="lg:col-span-5 bg-gray-50/80 rounded-2xl p-6 border border-gray-100 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 pb-4 border-b border-gray-200/60 mb-4">
            <h3 className="text-lg md:text-xl font-bold text-gray-900">
              유관 기관 네트워크
            </h3>
          </div>

          <div className="flex flex-col gap-2.5">
            {partnerList.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-white hover:bg-orange-50/50 px-4 py-3 rounded-xl border border-gray-200/80 hover:border-orange-200 text-sm font-semibold text-gray-700 hover:text-orange-600 transition-all shadow-xs group"
              >
                <span>{partner.name}</span>
                <span className="text-xs text-gray-400 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
