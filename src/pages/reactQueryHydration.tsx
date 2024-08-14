import {
  dehydrate,
  QueryClient,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import React, { useEffect } from "react";

interface Data {
  userId: 1;
  id: 1;
  title: "delectus aut autem";
  completed: false;
}
const getInitalData = async (query: number) => {
  const { data } = await axios(
    `https://jsonplaceholder.typicode.com/todos/${query}`,
  );

  return data;
};
const ReactQueryHydration = ({ data }: { data: Data }) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["hydration"],
    queryFn: () => getInitalData(1),
  });
  queryClient.setQueryData(["hydration"], data);
  // console.log(queryClient.setQueryData(["hydration"], query.data));

  return <div style={{ fontSize: "24px" }}>{data?.id}</div>;
};

export default ReactQueryHydration;

const withCSR = (next: any) => async (ctx: GetServerSidePropsContext) => {
  // check is it a client side navigation
  const isCSR = ctx.req.url?.startsWith("/_next");

  if (isCSR) {
    return {
      props: {},
    };
  }

  return next?.(ctx);
};

export const getServerSideProps = withCSR(
  async (ctx: GetServerSidePropsContext) => {
    const queryClient = new QueryClient();

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  },
);
