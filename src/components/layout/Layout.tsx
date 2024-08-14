import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import useAuthStore from "../auth/withZustand/hook/useAuthState";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
const HOME = "/" || "/zod" || "/auth-zustand";

enum Pages {
  home = "/",
  zod = "/zod",
}
const Layout = ({ children }: { children: ReactNode }) => {
  const session = useSession();
  const router = useRouter();

  return (
    <div>
      <div
        style={{
          background: "skyBlue",
          color: "black",
          fontWeight: "bold",
          fontSize: "32px",
        }}
      >
        {session.status}
        <button type="button" onClick={() => signOut()}>
          인생 로그아웃이요
        </button>
      </div>
      <Link
        href={"/test1"}
        style={{
          fontSize: "24px",
          background: "yellow",
          padding: "2rem",
          color: "black",
          fontWeight: "bold",
        }}
      >
        test1
      </Link>
      <Link
        href={"/test2"}
        style={{
          fontSize: "24px",
          background: "yellow",
          padding: "2rem",
          color: "black",
          fontWeight: "bold",
        }}
      >
        test2
      </Link>
      <Link
        href={"/test3"}
        style={{
          fontSize: "24px",
          background: "yellow",
          padding: "2rem",
          color: "black",
          fontWeight: "bold",
        }}
      >
        test3
      </Link>
      <Link
        href={"/reactQueryHydration"}
        style={{
          fontSize: "24px",
          background: "yellow",
          padding: "2rem",
          color: "black",
          fontWeight: "bold",
        }}
        shallow={true}
      >
        hydration
      </Link>

      {children}

      <ul>
        <li onClick={() => router.push("/test1")}>test1</li>
        <li onClick={() => router.push("/test2")}>test2</li>
        <li onClick={() => router.push("/test3")}>test3</li>
        <li onClick={() => router.push("/reactQueryHydration")}>hydration</li>
      </ul>
    </div>
  );
};

export default Layout;
