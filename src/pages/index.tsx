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
} from "react";
import { GetServerSidePropsContext } from "next";
import { signOut } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });
export default function Home({
  cookie,
}: {
  cookie: { [key: string]: string };
}) {
  return <div></div>;
}
