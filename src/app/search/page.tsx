"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchHeaderBar from "@/components/main/SearchHeaderBar";
import { CATEGORIES, CategoryType } from "@/constants/category";
import SearchhTab from "@/components/search/SearchhTab";
import SearchResultsSection from "@/components/search/SearchResultsSection";

export default function SearchPage() {
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
