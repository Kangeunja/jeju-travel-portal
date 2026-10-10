import { useMemo, useState } from "react";
import { CategoryId } from "@/constants/category";
import {
  ChevronRight,
  Filter,
  Heart,
  MapPin,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";

export type CategoryType = "all" | "spot" | "food" | "stay" | "shopping";

export interface SearchItem {
  id: string;
  title: string;
  category: CategoryType;
  categoryLabel: string;
  region: "제주시" | "서귀포시";
  address: string;
  tags: string[];
  imageUrl: string;
  likes: number;
  isLiked?: boolean;
}

const INITIAL_DATA: SearchItem[] = [
  {
    id: "1",
    title: "와우다이버스 스쿠버다이빙",
    category: "spot",
    categoryLabel: "관광명소",
    region: "서귀포시",
    address: "제주특별자치도 서귀포시 남원읍 신례리 123",
    tags: ["서귀포", "스쿠버다이빙", "인생샷", "액티비티"],
    imageUrl:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600",
    likes: 24,
    isLiked: false,
  },
  {
    id: "2",
    title: "성산일출봉 유채꽃밭",
    category: "spot",
    categoryLabel: "관광명소",
    region: "서귀포시",
    address: "제주특별자치도 서귀포시 성산읍 성산리 1",
    tags: ["서귀포", "유채꽃", "인생샷", "아이동반"],
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
    likes: 42,
    isLiked: true,
  },
  {
    id: "3",
    title: "올블루 스쿠버다이빙",
    category: "spot",
    categoryLabel: "관광명소",
    region: "서귀포시",
    address: "제주특별자치도 서귀포시 보목포구로 22",
    tags: ["서귀포", "스쿠버다이빙", "해양레저"],
    imageUrl:
      "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&q=80&w=600",
    likes: 18,
    isLiked: false,
  },
  {
    id: "4",
    title: "애월 유채꽃 베이커리 카페",
    category: "food",
    categoryLabel: "맛집/카페",
    region: "제주시",
    address: "제주특별자치도 제주시 애월읍 애월해안로 456",
    tags: ["제주시", "유채꽃", "카페", "인생샷"],
    imageUrl:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600",
    likes: 31,
    isLiked: false,
  },
  {
    id: "5",
    title: "서귀포 바다뷰 리조트 & 스파",
    category: "stay",
    categoryLabel: "숙소",
    region: "서귀포시",
    address: "제주특별자치도 서귀포시 중문관광로 77",
    tags: ["서귀포", "힐링", "숙소", "오션뷰"],
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600",
    likes: 56,
    isLiked: false,
  },
  {
    id: "6",
    title: "제주 동문재traditional 시장 기념품샵",
    category: "shopping",
    categoryLabel: "쇼핑",
    region: "제주시",
    address: "제주특별자치도 제주시 관덕로14길 20",
    tags: ["제주시", "쇼핑", "기념품", "시장"],
    imageUrl:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600",
    likes: 15,
    isLiked: false,
  },
];

export default function SearchResultsSection() {
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("recommend");
  const [activeTab, setActiveTab] = useState<CategoryId>("all");
  const [items, setItems] = useState<SearchItem[]>(INITIAL_DATA);
  const [currentPage, setCurrentPage] = useState(0);

  // 초기화
  const handleResetFilters = () => {
    setSelectedRegion("전체");
    setSelectedTags([]);
  };

  // 테마태그
  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  // 데이터 화면
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (activeTab !== "all" && item.category !== activeTab) return false;
      if (selectedRegion !== "전체" && item.region !== selectedRegion)
        return false;
      if (selectedTags.length > 0) {
        const hasMatchTag = selectedTags.some((tag) => item.tags.includes(tag));
        if (!hasMatchTag) return false;
      }

      return true;
    });
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* 모바일용 필터 토글 버튼 */}
        <div className="flex items-center justify-between lg:hidden">
          <span className="text-sm font-semibold text-slate-600">
            {/* 총 <strong className="text-blue-600">{filteredItems.length}</strong>건 */}
          </span>

          <button
            //   onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center space-x-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <SlidersHorizontal className="h-4 w-4" />

            <span>상세 필터</span>
          </button>
        </div>

        {/* 데스크탑 좌측 사이드바 필터 */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-16 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-blue-600" />

                <h3 className="font-bold text-slate-900">상세 필터</h3>
              </div>

              <button
                onClick={handleResetFilters}
                className="flex items-center text-xs font-medium text-slate-400 hover:text-blue-600"
              >
                <RotateCcw className="mr-1 h-3.5 w-3.5" />
                초기화
              </button>
            </div>

            {/* 지역 필터 */}
            <div className="mt-5 border-b border-slate-100 pb-5">
              <h4 className="mb-3 text-sm font-bold text-slate-800">
                지역 선택
              </h4>

              <div className="grid grid-cols-3 gap-2">
                {["전체", "제주시", "서귀포시"].map((reg) => (
                  <button
                    key={reg}
                    onClick={() => setSelectedRegion(reg)}
                    className={`rounded-lg py-2 text-xs font-semibold transition ${
                      selectedRegion === reg
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {reg}
                  </button>
                ))}
              </div>
            </div>

            {/* 테마 태그 필터 */}
            <div className="mt-5 border-b border-slate-100 pb-5">
              <h4 className="mb-3 text-sm font-bold text-slate-800">
                테마 태그
              </h4>

              <div className="flex flex-wrap gap-2">
                {[
                  "아이동반",
                  "인생샷",
                  "힐링",
                  "액티비티",
                  "오션뷰",
                  "해양레저",
                ].map((tag) => {
                  const isSelected = selectedTags.includes(tag);

                  return (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                        isSelected
                          ? "bg-blue-100 text-blue-700 ring-1 ring-blue-500"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      #{tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 편의 시설 필터 */}

            <div className="mt-5">
              <h4 className="mb-3 text-sm font-bold text-slate-800">
                편의 시설
              </h4>

              <div className="space-y-2 text-sm text-slate-600">
                {["주차 가능", "반려동물 동반", "배리어프리"].map(
                  (facility, idx) => (
                    <label
                      key={idx}
                      className="flex cursor-pointer items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />

                      <span>{facility}</span>
                    </label>
                  ),
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* 우측 검색 결과 영역 */}
        <section className="flex-1">
          {/* 결과 건수 & 정렬 옵션 */}
          <div className="mb-6 hidden items-center justify-between border-b border-slate-200 pb-4 lg:flex">
            <p className="text-sm font-medium text-slate-600">
              총
              <strong className="font-bold text-blue-600">
                {/* {filteredItems.length} */}
              </strong>
              건의 검색 결과가 있습니다.
            </p>

            <div className="flex items-center space-x-2 text-xs font-medium text-slate-500">
              <span>정렬:</span>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="rounded-lg border border-slate-200 bg-white py-1.5 pl-3 pr-8 text-xs font-semibold text-slate-700 focus:border-blue-500 focus:outline-none"
              >
                <option value="recommend">추천순</option>
                <option value="popular">인기순</option>
                <option value="latest">최신순</option>
              </select>
            </div>
          </div>

          {/* 카드 리스트 */}

          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {filteredItems.map((item) => (
                <article
                  key={item.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <span className="absolute left-3 top-3 rounded-md bg-slate-900/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      {item.categoryLabel}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <div className="mb-2 flex flex-wrap gap-1.5">
                        {item.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="text-xs font-medium text-blue-600"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 transition group-hover:text-blue-600">
                        {item.title}
                      </h3>

                      <div className="mt-2 flex items-center text-xs text-slate-500">
                        <MapPin className="mr-1 h-3.5 w-3.5 shrink-0 text-slate-400" />

                        <span className="truncate">{item.address}</span>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                      <button className="flex items-center text-xs font-bold text-blue-600 transition hover:text-blue-800">
                        <span>상세보기</span>

                        <ChevronRight className="ml-0.5 h-4 w-4" />
                      </button>

                      <button
                        // onClick={() => handleLikeToggle(item.id)}
                        className={`flex items-center space-x-1 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                          item.isLiked
                            ? "bg-rose-50 text-rose-600"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}
                      >
                        <Heart
                          className={`h-3.5 w-3.5 ${item.isLiked ? "fill-rose-500 text-rose-500" : ""}`}
                        />

                        <span>{item.likes}</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <Search className="h-8 w-8" />
              </div>

              <h3 className="mt-4 text-base font-bold text-slate-800">
                검색 결과가 없습니다.
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                다른 키워드로 검색하거나 선택한 필터를 해제해보세요.
              </p>

              <button
                onClick={handleResetFilters}
                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-700"
              >
                필터 초기화하기
              </button>
            </div>
          )}

          {/* 페이지네이션 */}

          {filteredItems.length > 0 && (
            <div className="mt-10 flex items-center justify-center space-x-2">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-9 w-9 rounded-lg text-xs font-bold transition ${
                    currentPage === page
                      ? "bg-blue-600 text-white shadow-md"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
