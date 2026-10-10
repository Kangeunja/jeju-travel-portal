export const CATEGORIES = ["전체", "관광지", "맛집", "숙박"] as const;
export type CategoryType = (typeof CATEGORIES)[number];

export const SEARCH_CATEGORIES = [
  { id: "all", label: "전체" },
  { id: "spot", label: "관광명소" },
  { id: "food", label: "맛집/카페" },
  { id: "stay", label: "숙소" },
  { id: "shopping", label: "쇼핑" },
] as const;

export type CategoryId = (typeof SEARCH_CATEGORIES)[number]["id"];
