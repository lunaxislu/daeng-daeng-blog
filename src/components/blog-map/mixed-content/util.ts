import { AxiosResponse } from "axios";
export interface I_SeoulAnimalMedicineAPI {
  APVCANCELYMD: string;
  APVPERMYMD: string; // id
  BPLCNM: string; // 상호명
  CLGENDDT: string;
  CLGSTDT: string;
  DCBYMD: string;
  DTLSTATEGBN: string;
  DTLSTATENM: string;
  LASTMODTS: string;
  LINDJOBGBNNM: string;
  LINDPRCBGBNNM: string;
  LINDSEQNO: string;
  MGTNO: string;
  OPNSFTEAMCODE: string;
  RDNPOSTNO: string;
  RDNWHLADDR: string; //도로명
  RGTMBDSNO: string;
  ROPNYMD: string;
  SITEAREA: string;
  SITEPOSTNO: string;
  SITETEL: string; // 전화번호
  SITEWHLADDR: string;
  TOTEPNUM: string;
  TRDSTATEGBN: string;
  TRDSTATENM: string;
  UPDATEDT: string;
  UPDATEGBN: string;
  UPTAENM: string;
  X: string; // x축
  Y: string; // y축
}
/**
 * @param axiosRes seoul_api(동물병원, 동물약국)에서 받아온 res에서 data만을 추출 하는 함수입니다.
 * @returns
 */
function extractSeoulApiData(
  axiosRes: {
    data: AxiosResponse["data"];
    query_string: string;
    area: string | null;
  }[],
): I_SeoulAnimalMedicineAPI[] {
  const results = axiosRes
    .map((result) => result.data[`${result.query_string}${result.area}`]["row"])
    .flat()
    .filter((target) => target.DTLSTATENM === "정상" && target.X > 1); //target.X>1을 추가한 이유는 X,Y좌표 값이 없는 데이터가 있기에 지도 상 위치표시가 이상해지기 때문입니다.

  return results;
}
export function refineSeoulApiData(
  axiosRes: {
    data: AxiosResponse["data"];
    query_string: string;
    area: string | null;
  }[],
) {
  const extractData = extractSeoulApiData(axiosRes);

  return extractData;
}
