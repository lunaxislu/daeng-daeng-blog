import Image from "next/image";
import { Inter } from "next/font/google";
import useAuthStore, {
  getAuthValue,
} from "@/components/auth/withZustand/hook/useAuthState";
import {
  DependencyList,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { GetServerSidePropsContext } from "next";
import { signOut } from "next-auth/react";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
const getInitalData = async (query: number) => {
  const { data } = await axios(
    `https://jsonplaceholder.typicode.com/todos/${query}`,
  );

  return data;
};
const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  // console.log(query);

  return <div></div>;
}
const cacheQuery = () => {
  const date = Date.now();
  const queryClient = new QueryClient({});
  return () => queryClient;
};
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const queryClient = cacheQuery();
  queryClient;
  console.log(queryClient());
  return {
    props: {
      query: "asd",
    },
  };
}
