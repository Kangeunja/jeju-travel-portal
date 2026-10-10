import { z } from "zod";

import type { TourSpotItem } from "@/types/tourSpot";

/** API가 빈 문자열("")로 내려주는 필드를 undefined로 정규화 */
const optionalString = z
  .union([z.string(), z.undefined()])
  .transform((val) => {
    if (val === undefined) return undefined;
    const trimmed = val.trim();
    return trimmed === "" ? undefined : trimmed;
  })
  .optional();

const requiredString = z.string().transform((val) => val.trim());

const coerceNumber = z
  .union([z.number(), z.string()])
  .transform((val) => Number(val));

export const tourSpotItemSchema = z.object({
  addr1: requiredString,
  addr2: optionalString,
  areacode: requiredString,
  cat1: requiredString,
  cat2: requiredString,
  cat3: requiredString,
  contentid: requiredString,
  contenttypeid: requiredString,
  createdtime: requiredString,
  firstimage: optionalString,
  firstimage2: optionalString,
  cpyrhtDivCd: requiredString,
  mapx: requiredString,
  mapy: requiredString,
  mlevel: requiredString,
  modifiedtime: requiredString,
  sigungucode: requiredString,
  tel: optionalString,
  title: requiredString,
  zipcode: requiredString,
  lDongRegnCd: requiredString,
  lDongSignguCd: requiredString,
  lclsSystm1: requiredString,
  lclsSystm2: requiredString,
  lclsSystm3: requiredString,
}) satisfies z.ZodType<TourSpotItem>;

const tourSpotItemsInputSchema = z.union([
  tourSpotItemSchema,
  z.array(tourSpotItemSchema),
]);

export const tourSpotResponseSchema = z.object({
  response: z.object({
    header: z.object({
      resultCode: requiredString,
      resultMsg: requiredString,
    }),
    body: z.object({
      items: z
        .object({
          item: tourSpotItemsInputSchema.optional(),
        })
        .optional()
        .default({}),
      numOfRows: coerceNumber,
      pageNo: coerceNumber,
      totalCount: coerceNumber,
    }),
  }),
});

export type ParsedTourSpotResponse = z.infer<typeof tourSpotResponseSchema>;

export function parseTourSpotItems(raw: unknown): TourSpotItem[] {
  const parsed = tourSpotResponseSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(
      `Tour API 응답 형식 오류: ${parsed.error.issues[0]?.message ?? "unknown"}`,
    );
  }

  const item = parsed.data.response.body.items?.item;
  if (!item) return [];
  return Array.isArray(item) ? item : [item];
}
