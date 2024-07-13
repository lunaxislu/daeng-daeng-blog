import KakaoPro4 from "@/components/blog-map/pro4/KakaoPro4";
import useKakaoLoader from "@/components/blog-map/hooks/useKakaoLoader";
import { useRouter } from "next/router";
import React, { Profiler } from "react";
import proj4 from "proj4";
const KakaoPagePro4 = () => {
  const { query } = useRouter();
  const [loading, error] = useKakaoLoader();

  const number = query.number as string;
  if (loading) return <div>로딩중</div>;

  return <KakaoPro4 query={number} />;
};

export default KakaoPagePro4;
