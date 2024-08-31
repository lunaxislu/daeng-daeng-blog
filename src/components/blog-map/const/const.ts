import axios, { AxiosResponse } from "axios";
import { CSSProperties } from "react";
import { MapMarkerProps } from "react-kakao-maps-sdk";
export interface I_CustomMarkerProps extends MapMarkerProps {
  id: string;
  position: { lng: number; lat: number }; //  marker를 배열 돌릴 때 key값을 넣으려면 type custom 해야함
  place: string;
  address: string;
  phone: string;
}

export const CONTAINER_STYLE: CSSProperties = {
  width: "80%",
  margin: "0 auto",
  height: "100vh",
  display: "flex",
  placeContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

export const MAP_STYLE: CSSProperties = {
  marginTop: "20px",
  width: "400px",
  height: "600px",
  position: "relative",
  overflow: "hidden",
};

export const MAP_CENTER = { lat: 37.5616381543437, lng: 126.996862574927 };
const getAnimalHospitalData = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_ANIMAL_MEDICINE}`,
  headers: {
    "Cache-Control": "max-age=3600",
  },
});
const getAnimalPh = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_ANIMAL_MEDICINE}`,
  headers: {
    "Cache-Control": "max-age=3600",
  },
});

export const getAnimalData = async (query: string) => {
  const res = await Promise.all([
    getAnimalHospitalData(`LOCALDATA_020301_DB/1/${query}/01`),
    getAnimalPh(`LOCALDATA_020302_DB/1/${query}/01`),
  ]);
  const data = res
    .map((res) => {
      const response = res.data;
      for (let key in response) {
        return response[key].row;
      }
    })
    .flat();

  return data;
};
interface I_SeoulAnimalMedicineAPI {
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
export type T_LocationType =
  | "JG"
  | "YC"
  | "GJ"
  | "GD"
  | "JN"
  | "SD"
  | "JR"
  | "GC"
  | "GS"
  | "YD"
  | "YS"
  | "DD"
  | "DJ"
  | "GB"
  | "NW"
  | "SP"
  | "SC"
  | "SM"
  | "MP"
  | "DB"
  | "EP"
  | "SB"
  | "GA"
  | "GR"
  | "GN";

export const SEOUL_LOCATION: { location: string; api_query: T_LocationType }[] =
  [
    {
      location: "중구",
      api_query: "JG",
    },
    {
      location: "양천구",
      api_query: "YC",
    },
    {
      location: "광진구",
      api_query: "GJ",
    },
    {
      location: "강동구",
      api_query: "GD",
    },
    {
      location: "종로구",
      api_query: "JN",
    },
    {
      location: "성동구",
      api_query: "SD",
    },
    {
      location: "중랑구",
      api_query: "JR",
    },
    {
      location: "금천구",
      api_query: "GC",
    },
    {
      location: "강서구",
      api_query: "GS",
    },
    {
      location: "영등포구",
      api_query: "YD",
    },
    {
      location: "용산구",
      api_query: "YS",
    },
    {
      location: "동대문구",
      api_query: "DD",
    },
    {
      location: "동작구",
      api_query: "DJ",
    },
    {
      location: "강북구",
      api_query: "GB",
    },
    {
      location: "노원구",
      api_query: "NW",
    },
    {
      location: "송파구",
      api_query: "SP",
    },
    {
      location: "서초구",
      api_query: "SC",
    },
    {
      location: "서대문구",
      api_query: "SM",
    },
    {
      location: "마포구",
      api_query: "MP",
    },
    {
      location: "도봉구",
      api_query: "DB",
    },
    {
      location: "은평구",
      api_query: "EP",
    },
    {
      location: "성북구",
      api_query: "SB",
    },
    {
      location: "관악구",
      api_query: "GA",
    },
    {
      location: "구로구",
      api_query: "GR",
    },
    {
      location: "강남구",
      api_query: "GN",
    },
  ];
import proj4 from "proj4";

// Korea 2000 좌표 시스템 정의 (EPSG:2097)
proj4.defs(
  "EPSG:2097",
  "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs"
);

// WGS84 좌표 시스템 정의 - 카카오맵에서 사용하는 좌표계
proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");
/**
 *
 * @param x x좌표
 * @param y y좌표
 * @returns lng lat을 반환합니다.
 */
function convertGRStoWGS84(x: string, y: string) {
  const transformedCoords = proj4("EPSG:2097", "EPSG:4326", [
    Number(x),
    Number(y),
  ]);
  const wgs84Coords = { lat: transformedCoords[1], lng: transformedCoords[0] };
  return wgs84Coords;
}
/**
 * @param axiosRes seoul_api(동물병원, 동물약국)에서 받아온 res에서 data만을 추출 하는 함수입니다.
 * @returns
 */
function extractSeoulApiData(
  axiosRes: {
    data: AxiosResponse["data"];
    query_string: string;
    api_query: string | null;
  }[]
): I_SeoulAnimalMedicineAPI[] {
  const results = axiosRes
    .map(
      (result) =>
        result.data[`${result.query_string}${result.api_query}`]["row"]
    )
    .flat()
    .filter((target) => target.DTLSTATENM === "정상" && target.X > 1); //target.X>1을 추가한 이유는 X,Y좌표 값이 없는 데이터가 있기에 지도 상 위치표시가 이상해지기 때문입니다.

  return results;
}
/**
 * @param extraction 추출된 data를 marker로 변형시킵니다.
 */
function formattingDataMarkers(extraction: I_SeoulAnimalMedicineAPI[]) {
  const markers = extraction.map((data) => {
    const marker = new Object() as I_CustomMarkerProps;
    marker.id = data.APVPERMYMD;
    marker.place = data.BPLCNM;
    marker.address = data.RDNWHLADDR;
    marker.position = convertGRStoWGS84(data.X, data.Y);
    return marker;
  });

  return markers;
}

export function refineSeoulApiData(
  axiosRes: {
    data: AxiosResponse["data"];
    query_string: string;
    api_query: string | null;
  }[]
) {
  const extractData = extractSeoulApiData(axiosRes);
  const markers = formattingDataMarkers(extractData);
  return markers;
}
