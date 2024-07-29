import Image from "next/image";
import { Inter } from "next/font/google";
import useAuthStore, {
  getAuthValue,
} from "@/components/auth/withZustand/hook/useAuthState";
import { useEffect, useLayoutEffect } from "react";
import { GetServerSidePropsContext } from "next";

const inter = Inter({ subsets: ["latin"] });
export default function Home({
  cookie,
}: {
  cookie: { [key: string]: string };
}) {
  console.log(getAuthValue("token"));
  console.log(cookie);
  return <div></div>;
}

function fileToArrayBuffer(file: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const arrayBuffer = event.target!.result;
      resolve(arrayBuffer);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  console.log(ctx);
  const { cookies } = ctx.req;

  return { props: { cookie: cookies } };
};
