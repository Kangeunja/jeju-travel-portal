/** 한국관광공사 KorService2 areaBasedList2 / searchKeyword2 관광지 1건 */
export interface TourSpotItem {
  addr1: string;
  addr2?: string;
  areacode: string;
  cat1: string;
  cat2: string;
  cat3: string;
  contentid: string;
  contenttypeid: string;
  createdtime: string;
  firstimage?: string;
  firstimage2?: string;
  cpyrhtDivCd: string;
  mapx: string;
  mapy: string;
  mlevel: string;
  modifiedtime: string;
  sigungucode: string;
  tel?: string;
  title: string;
  zipcode: string;
  lDongRegnCd: string;
  lDongSignguCd: string;
  lclsSystm1: string;
  lclsSystm2: string;
  lclsSystm3: string;
}

export interface TourSpotResponseHeader {
  resultCode: string;
  resultMsg: string;
}

export interface TourSpotResponseBody {
  items: {
    item?: TourSpotItem | TourSpotItem[];
  };
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}

/** Tour API JSON 루트 (`_type=json`) */
export interface TourSpotResponse {
  response: {
    header: TourSpotResponseHeader;
    body: TourSpotResponseBody;
  };
}

export interface JejuSpotsQueryParams {
  cat3?: string;
  keyword?: string;
  pageNo?: number;
  numOfRows?: number;
}
