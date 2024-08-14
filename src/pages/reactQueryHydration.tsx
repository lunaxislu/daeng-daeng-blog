import {
  dehydrate,
  QueryClient,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { GetServerSidePropsContext } from "next";
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
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const data = await getInitalData(1);
  await queryClient.prefetchQuery({
    queryKey: ["hydration"],
    queryFn: () => getInitalData(1),
    staleTime: 600000,
    gcTime: 600000000000,
  });
  console.log(ctx.req.url);
  console.log(queryClient);
  return {
    props: {
      data,
      dehydrateState: dehydrate(queryClient),
    },
  };
}
