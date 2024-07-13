import React, { CSSProperties, useEffect, useState } from "react";
import {
  CONTAINER_STYLE,
  getAnimalData,
  MAP_CENTER,
  MAP_STYLE,
} from "../const/const";
import { Map } from "react-kakao-maps-sdk";
import { useQuery } from "@tanstack/react-query";
import proj4 from "proj4";
const MAP_CONTAINER_STYLE: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const CAPTION_STYLE: CSSProperties = { fontWeight: "bolder", fontSize: "24px" };
proj4.defs(
  "EPSG:5174",
  "+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43"
);
proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");
const convertGRStoWGS84 = (x: string, y: string) => {
  // 입력 좌표값 공백 제거 및 숫자로 변환
  const cleanX = parseFloat(x.trim());
  const cleanY = parseFloat(y.trim());

  // EPSG:3857에서 WGS84로 좌표 변환
  const wgs84Coords = proj4("EPSG:5174", "EPSG:4326", [cleanX, cleanY]);
  // console.log('WGS84 좌표:', wgs84Coords)

  const convertedCoords = { lat: wgs84Coords[1], lng: wgs84Coords[0] };
  return convertedCoords;
};
const CompareAddressVsPro4 = ({ query }: { query: string }) => {
  const [pro4KakaoMap, setpro4KakaoMap] = useState<kakao.maps.Map>();
  const [geoCoderKakaoMap, setGeoCoderKakaoMap] = useState<kakao.maps.Map>();
  const [db, setDB] = useState<string | null>(null);
  const { addressSearch } = new kakao.maps.services.Geocoder();
  const { data: geoCoderData, isLoading: isGeoCoderLoding } = useQuery({
    queryKey: ["addressSearch", "compare"],
    queryFn: () => getAnimalData(query),
    enabled: !!db,
  });
  const { data: pro4Data, isLoading: isPro4Loading } = useQuery({
    queryKey: ["pro4", "compare"],
    queryFn: () => getAnimalData(query),
    enabled: !!db,
  });

  const handlePro4KakaoMap = (map: kakao.maps.Map) => {
    if (pro4KakaoMap) return;
    setpro4KakaoMap(map);
  };
  const handleGeoCoderKakaoMap = (map: kakao.maps.Map) => {
    if (geoCoderKakaoMap) return;
    setGeoCoderKakaoMap(map);
  };
  const proj42Result = () => {
    if (!pro4KakaoMap) return;
    if (!pro4Data) return;
    const bounds = new kakao.maps.LatLngBounds();
    console.time("proj42Result");
    pro4Data.forEach((item: any, index: number) => {
      if (!item.X || !item.Y) return;
      const wgs84Coords = convertGRStoWGS84(item.X, item.Y);
      const coords = new kakao.maps.LatLng(wgs84Coords.lat, wgs84Coords.lng);
      // 카카오맵에 마커를 그려주기위해 새로운 인스턴스 만듬
      const marker = new kakao.maps.Marker({
        map: pro4KakaoMap,
        position: coords,
      });
      // 경계 영역을 확장합니다
      bounds.extend(coords);

      // 모든 주소에 대해 검색이 완료된 후에 지도의 경계를 설정합니다
      if (index === pro4Data.length - 1) {
        pro4KakaoMap.setBounds(bounds);
      }
    });
    console.timeEnd("proj42Result");
  };

  const address2Result = () => {
    if (!geoCoderKakaoMap) return;
    if (!geoCoderData) return;
    const bounds = new kakao.maps.LatLngBounds();
    console.time("addressSearch");

    const promises = geoCoderData.map((item: any) => {
      console.log("🚀 ~ KakaoAddress ~ data:", geoCoderData);
      return new Promise<void>((resolve) => {
        addressSearch(item.RDNWHLADDR, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(
              result[0].y as any,
              result[0].x as any
            );

            // 결과값으로 받은 위치를 마커로 표시합니다
            const marker = new kakao.maps.Marker({
              map: geoCoderKakaoMap,
              position: coords,
            });
            // 경계 영역을 확장합니다
            bounds.extend(coords);
          }
          resolve();
        });
      });
    });
    Promise.all(promises).then(() => {
      // 모든 주소에 대해 검색이 완료된 후에 지도의 경계를 설정합니다
      geoCoderKakaoMap.setBounds(bounds);
      console.timeEnd("addressSearch");
    });
  };
  useEffect(() => {
    if (!pro4Data) return;
    proj42Result();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, pro4Data]);
  useEffect(() => {
    if (!geoCoderData) return;
    address2Result();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, geoCoderData]);
  return (
    <div style={CONTAINER_STYLE}>
      <span
        onClick={() => setDB("DB")}
        style={{
          width: "120px",
          backgroundColor: "wheat",
          color: "black",
          height: "80px",
          textAlign: "center",
        }}
      >
        도봉구
      </span>
      <div style={{ display: "flex", gap: "40px" }}>
        {isPro4Loading ? (
          <div>로딩중...</div>
        ) : (
          <div style={MAP_CONTAINER_STYLE}>
            <p style={CAPTION_STYLE}>Pro4를 사용한 렌더링 </p>
            <Map
              center={MAP_CENTER}
              style={MAP_STYLE}
              onCreate={handlePro4KakaoMap}
            ></Map>
          </div>
        )}

        {/* {isGeoCoderLoding ? (
          <div>로딩중...</div>
        ) : (
          <div style={MAP_CONTAINER_STYLE}>
            <p style={CAPTION_STYLE}>KakaoAPI를 사용한 렌더링 </p>
            <Map center={MAP_CENTER} style={MAP_STYLE} onCreate={handleGeoCoderKakaoMap}></Map>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default CompareAddressVsPro4;
