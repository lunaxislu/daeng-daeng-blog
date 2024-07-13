import {
  CONTAINER_STYLE,
  MAP_CENTER,
  MAP_STYLE,
} from "@/components/blog-map/const/const";
import useKakaoLoader from "@/components/blog-map/hooks/useKakaoLoader";
import React, { useState } from "react";
import { Map } from "react-kakao-maps-sdk";

const KakaoPage = () => {
  const [loading, error] = useKakaoLoader();
  const [kakaoMap, setKakaoMap] = useState<kakao.maps.Map>();
  const handleKakaoMap = (map: kakao.maps.Map) => {
    if (map) return;
    setKakaoMap(map);
  };

  if (loading) return <div>로딩중</div>;
  return (
    <div style={CONTAINER_STYLE}>
      <Map
        center={MAP_CENTER}
        style={MAP_STYLE}
        onCreate={handleKakaoMap}
      ></Map>
    </div>
  );
};

export default KakaoPage;
