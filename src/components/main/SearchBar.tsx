import { useState, FormEvent } from "react";
import SearchDropdown from "./SearchDropdown";
import { useRouter } from "next/navigation";
import { CategoryType } from "@/constants/category";

export default function SearchBar() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>("전체");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedTerm = searchTerm.trim();
    if (!trimmedTerm) return;

    const queryParams = new URLSearchParams({
      search: searchTerm,
      category: selectedCategory,
    });

    router.push(`/search?${queryParams}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center bg-white rounded-xl px-4 h-16 shadow-xl w-full max-w-3xl mx-auto text-gray-800"
    >
      {/* 카테고리 드롭다운 */}
      <SearchDropdown
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="검색어를 입력하세요"
        className="flex-1 h-full px-3 text-sm md:text-base outline-none bg-transparent text-gray-800 placeholder-gray-400 font-normal border-none"
      />

      {/* 검색 버튼 */}
      <button
        type="submit"
        className="pl-2 flex items-center justify-center text-gray-800 hover:text-blue-600 transition-colors shrink-0"
        aria-label="검색"
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
    </form>
  );
}
