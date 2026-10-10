"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchJejuSpotsFromApi } from "@/lib/api/tourSpotApi";
import type { JejuSpotsQueryParams, TourSpotItem } from "@/types/tourSpot";

export const jejuSpotsQueryKey = (params: JejuSpotsQueryParams) =>
  ["jejuSpots", params] as const;

export function useGetJejuSpots(
  params: JejuSpotsQueryParams,
  options?: {
    enabled?: boolean;
  },
) {
  const hasQuery = Boolean(params.cat3?.trim() || params.keyword?.trim());

  return useQuery<TourSpotItem[], Error>({
    queryKey: jejuSpotsQueryKey(params),
    queryFn: () => fetchJejuSpotsFromApi(params),
    enabled: options?.enabled ?? hasQuery,
    staleTime: 1000 * 60 * 60,
  });
}
