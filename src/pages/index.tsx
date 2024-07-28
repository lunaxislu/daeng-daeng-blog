import Image from "next/image";
import { Inter } from "next/font/google";
import useAuthStore, {
  getAuthValue,
} from "@/components/auth/withZustand/hook/useAuthState";
import { useEffect, useLayoutEffect } from "react";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
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
