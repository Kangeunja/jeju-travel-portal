"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchHeaderBar from "@/components/main/SearchHeaderBar";
import { CATEGORIES, CategoryType } from "@/constants/category";
import SearchhTab from "@/components/search/SearchhTab";
import SearchResultsSection from "@/components/search/SearchResultsSection";

function SearchContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category");

  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(
    CATEGORIES.includes(categoryQuery as any)
      ? (categoryQuery as CategoryType)
      : "전체",
  );

  return (
    <div className="bg-slate-50 min-h-full">
      <SearchHeaderBar
        selected={selectedCategory}
        onSelect={setSelectedCategory}
        search={searchTerm}
        onSearch={setSearchTerm}
      />
      <SearchhTab />
      <SearchResultsSection />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
