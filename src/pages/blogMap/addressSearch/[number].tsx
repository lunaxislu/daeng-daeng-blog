import KakaoAddress from "@/components/blog-map/address/KakaoAddress";
import useKakaoLoader from "@/components/blog-map/hooks/useKakaoLoader";
import { useRouter } from "next/router";
import React, { Profiler } from "react";

const KakaoPageAPI = () => {
  const { query } = useRouter();
  const [loading, error] = useKakaoLoader();

  const number = query.number as string;
  if (loading) return <div>로딩중</div>;
  return <KakaoAddress query={number} />;
};

export default KakaoPageAPI;
