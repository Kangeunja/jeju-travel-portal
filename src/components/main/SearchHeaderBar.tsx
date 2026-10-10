import { CategoryType } from "@/constants/category";
import SearchDropdown from "./SearchDropdown";
import { POPULAR_TAGS } from "@/constants/tag";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

type SearchHeaderBarProps = {
  selected: CategoryType;
  onSelect: (category: CategoryType) => void;
  search: string;
  onSearch: (search: string) => void;
};

export default function SearchHeaderBar({
  selected,
  onSelect,
  search,
  onSearch,
}: SearchHeaderBarProps) {
  const router = useRouter();
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedTerm = search.trim();
    if (!trimmedTerm) return;

    const queryParams = new URLSearchParams({
      search: search,
      category: selected,
    });

    router.push(`/search?${queryParams}`);
  };
  return (
    <form
      onSubmit={handleSearch}
      className="border-b border-blue-100 bg-gradient-to-b from-blue-600 via-blue-500 to-sky-500 px-4 py-8 text-white sm:py-10"
    >
      <div className="mx-auto max-w-3xl">
        <div className="relative flex items-center overflow-hidden rounded-xl bg-white shadow-xl ring-4 ring-white/20 transition focus-within:ring-white/40">
          <div className="flex items-center border-r border-slate-200 px-4 text-slate-500">
            {/* 카테고리 드롭다운 */}
            <SearchDropdown selected={selected} onSelect={onSelect} />
            {/* <ChevronDown className="ml-1 h-4 w-4" /> */}
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="검색어를 입력해보세요 (예: 유채꽃, 스쿠버다이빙)"
            className="w-full bg-transparent px-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none sm:text-base"
          />
          <button
            aria-label="검색"
            type="submit"
            className="m-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700"
          >
            <svg
              className="w-6 h-6 md:w-7 md:h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-blue-100 sm:text-sm">
          <span className="font-semibold text-white">인기 키워드:</span>
          {POPULAR_TAGS.map((kw) => (
            <button
              key={kw}
              // onClick={() => setSearchTerm(kw.replace("#", ""))}
              className="rounded-full bg-white/10 px-2.5 py-1 backdrop-blur-sm transition hover:bg-white/20"
            >
              {kw}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}
