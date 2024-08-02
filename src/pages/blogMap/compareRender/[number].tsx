import CompareAddressVsPro4 from "@/components/blog-map/compareAddressVsPro4/CompareAddressVsPro4";
import useKakaoLoader from "@/components/blog-map/hooks/useKakaoLoader";
import { useRouter } from "next/router";
import React from "react";

const CompareMap = () => {
  const { query } = useRouter();
  const [loading, error] = useKakaoLoader();
  const number = query.number as string;
  if (loading) return <div>로딩중</div>;
  return <CompareAddressVsPro4 query={number} />;
};

export default CompareMap;
