export interface I_SeoulParkAPI {
  AREA: string //부지 면적
  GUIDANCE: string // 안내도
  G_LATITUDE: string // Y좌표(GRS80TM)
  G_LONGITUDE: string //X좌표(GRS80TM)
  LATITUDE: string // Y좌표(WGS84)
  LONGITUDE: string //X좌표(WGS84)
  MAIN_EQUIP: string // 주요시설
  MAIN_PLANTS: string // 주요식물
  OPEN_DT: string // 개원일
  P_ADDR: string // 주소
  P_ADMINTEL: string //전화번호
  P_IDX: string // 연번(공원번호)
  P_IMG: string // 이미지
  P_LIST_CONTENT: string // 공원개요
  P_NAME: string // 관리부서
  P_PARK: string // 공원명
  P_ZONE: string // 지역
  TEMPLATE_URL: string // 홈페이지 바로가기 url
  USE_REFER: string // 이용시 참고사항
  VISIT_ROAD: string // 오시는길
}
export function formattedGroupByKey<T extends { [key: string | number]: unknown }>(array: T[], key: keyof T) {
  return array.reduce((acc, cur) => {
    const stringkey = cur[key] as string
    if (acc.get(stringkey)) {
      acc.get(stringkey)?.push(cur)
    } else {
      acc.set(stringkey, [cur])
    }
    return acc
  }, new Map<keyof T, T[]>())
}
