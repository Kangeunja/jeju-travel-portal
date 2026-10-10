/** `/api/augment-spot` 응답 `data` 필드 */
export interface SpotAugmentInfoBox {
  highlight: string;
  targetAudience: string;
  locationType: string;
}

export interface SpotAugmentData {
  summaryBadge: string;
  richDescription: string;
  infoBox: SpotAugmentInfoBox;
  tags: string[];
  aiTip: string;
}
