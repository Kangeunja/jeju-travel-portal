"use client";

import Link from "next/link";
import { MapPin, Sparkles, Star, Users } from "lucide-react";

import type { SpotAugmentData } from "@/types/augmentSpot";

type SpotDetailHeaderProps = {
  data: SpotAugmentData;
  /** 관광지명 등 (뱃지 위 선택 표시) */
  title?: string;
  className?: string;
  /** 미전달 시 `/search?search={tag}` 로 이동 */
  onTagClick?: (tag: string) => void;
};

const INFO_ITEMS = [
  {
    key: "highlight" as const,
    label: "핵심 포인트",
    Icon: Star,
    iconWrapClass: "text-amber-600 bg-amber-50 ring-1 ring-amber-100",
  },
  {
    key: "targetAudience" as const,
    label: "추천 대상",
    Icon: Users,
    iconWrapClass: "text-emerald-600 bg-emerald-50 ring-1 ring-emerald-100",
  },
  {
    key: "locationType" as const,
    label: "공간 유형",
    Icon: MapPin,
    iconWrapClass: "text-sky-600 bg-sky-50 ring-1 ring-sky-100",
  },
] as const;

function normalizeTag(tag: string) {
  const trimmed = tag.trim();
  if (!trimmed) return "";
  return trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
}

export default function SpotDetailHeader({
  data,
  title,
  className = "",
  onTagClick,
}: SpotDetailHeaderProps) {
  const { summaryBadge, richDescription, infoBox, tags, aiTip } = data;

  return (
    <header
      className={`w-full max-w-4xl mx-auto space-y-8 ${className}`.trim()}
    >
      <div className="space-y-4 text-center sm:text-left">
        {/* {title ? (
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {title}
          </h1>
        ) : null} */}

        <div className="flex justify-center sm:justify-start">
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-1.5 text-sm font-semibold text-white shadow-md shadow-orange-500/25 ring-2 ring-orange-200/60">
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-white/90 animate-pulse"
              aria-hidden
            />
            {summaryBadge}
          </span>
        </div>

        <p className="text-base sm:text-base leading-relaxed text-slate-600 whitespace-pre-line">
          {richDescription}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {INFO_ITEMS.map(({ key, label, Icon, iconWrapClass }) => {
          const value = infoBox[key];

          return (
            <div
              key={key}
              className="flex flex-col items-center sm:items-start gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div
                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${iconWrapClass}`}
              >
                <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {label}
                </p>
                <p className="mt-1 text-sm font-medium text-slate-800 leading-snug">
                  {value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="relative overflow-hidden rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50 via-orange-50 to-white p-5 sm:p-6 shadow-sm"
        role="note"
        aria-label="AI 여행 팁"
      >
        <div
          className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-amber-200/30 blur-2xl"
          aria-hidden
        />
        <div className="relative flex gap-3 sm:gap-4">
          <div className="shrink-0 pt-0.5">
            <span className="relative inline-flex">
              <Sparkles
                className="h-6 w-6 text-amber-500 drop-shadow-sm motion-safe:animate-[sparkle_2s_ease-in-out_infinite]"
                aria-hidden
              />
              <Sparkles
                className="absolute -right-1 -top-1 h-3 w-3 text-orange-400 opacity-80 motion-safe:animate-[sparkle_2s_ease-in-out_infinite_0.5s]"
                aria-hidden
              />
            </span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-700/90">
              AI Tip
            </p>
            <p className="mt-1.5 text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
              {aiTip}
            </p>
          </div>
        </div>
      </div>

      {tags.length > 0 ? (
        <div className="flex flex-wrap justify-center sm:justify-start gap-2">
          {tags.map((rawTag) => {
            const display = normalizeTag(rawTag);
            if (!display) return null;

            const chipClass =
              "inline-flex items-center rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-orange-300 hover:bg-orange-50 hover:text-orange-800 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2";

            if (onTagClick) {
              return (
                <button
                  key={display}
                  type="button"
                  className={`cursor-pointer ${chipClass}`}
                  onClick={() => onTagClick(rawTag.trim())}
                >
                  {display}
                </button>
              );
            }

            const query = encodeURIComponent(rawTag.trim().replace(/^#/, ""));
            return (
              <Link
                key={display}
                href={`/search?search=${query}`}
                className={chipClass}
              >
                {display}
              </Link>
            );
          })}
        </div>
      ) : null}
    </header>
  );
}
