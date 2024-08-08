import { hasQueryCache } from "@/components/react-query-cache/cache";
import { useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React from "react";

const Test1 = () => {
  const router = useRouter();
  console.log(router.asPath);
  const query = useQuery({
    queryKey: ["test1"],
    queryFn: () => hasQueryCache,
  });
  return <div></div>;
};

export default Test1;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const data = await hasQueryCache(1);
  console.log(ctx.req.url);
  console.log(ctx.resolvedUrl);

  return {
    props: {
      data,
    },
  };
}
