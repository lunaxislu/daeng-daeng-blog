import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { GetServerSidePropsContext } from "next";
import React, { useEffect } from "react";

const getInitalData = async (query: number) =>
  await axios(`https://jsonplaceholder.typicode.com/todos/${query}`);
//
const ReactQueryInitialData = ({ data }: { data: AxiosResponse }) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["react-query"],
    queryFn: () => getInitalData(1),
    initialData: data,
    // gcTime: 80000000000,
    staleTime: 800000,
    initialDataUpdatedAt: () => {
      return queryClient.getQueryState(["react-query"])?.dataUpdatedAt;
    },
  });
  // console.log(queryClient.getQueryState(["react-query"]));
  return <div></div>;
};

export default ReactQueryInitialData;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { data } = await getInitalData(1);
  // console.log("🚀 ~ getServerSideProps ~ data:", data);

  return { props: { data } };
}
