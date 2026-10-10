import { useState } from "react";
import { CategoryId, SEARCH_CATEGORIES } from "@/constants/category";

export default function SearchhTab() {
  const [activeTab, setActiveTab] = useState<CategoryId>("all");

  //   임시 데이터
  const categoryCounts = {
    all: 120,
    spot: 45,
    food: 30,
    stay: 25,
    shopping: 20,
  };

  const categoriesWithCount = SEARCH_CATEGORIES.map((item) => ({
    ...item,
    count: categoryCounts[item.id] ?? 0,
  }));

  return (
    <section className="sticky top-0 z-30 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex overflow-x-auto no-scrollbar">
          {categoriesWithCount.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex shrink-0 items-center border-b-2 px-5 py-3.5 text-sm font-bold transition ${
                  isActive
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800"
                }`}
              >
                {tab.label}
                <span
                  className={`ml-1.5 rounded-full px-2 py-0.5 text-xs ${
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
