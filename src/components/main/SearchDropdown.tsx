import { useRef, useState } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { CATEGORIES, CategoryType } from "@/constants/category";

interface SearchDropdownProps {
  selected: CategoryType;
  onSelect: (category: CategoryType) => void;
}

export default function SearchDropdown({
  selected,
  onSelect,
}: SearchDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <div
      ref={dropdownRef}
      className="w-22.5 relative flex items-center h-full mr-2 border-r border-gray-200 shrink-0"
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 bg-transparent text-sm md:text-base font-medium text-gray-700 outline-none cursor-pointer rounded-md hover:bg-gray-100/50 transition-colors text-left"
      >
        <span>{selected}</span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full -left-3 mt-2 w-24 bg-white border border-gray-100 rounded-xl shadow-lg py-1.5 z-50">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                onSelect(item);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors  ${
                selected === item
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
