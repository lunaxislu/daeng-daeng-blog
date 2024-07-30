import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import useAuthStore from "../auth/withZustand/hook/useAuthState";
import { signOut, useSession } from "next-auth/react";
const HOME = "/" || "/zod" || "/auth-zustand";

enum Pages {
  home = "/",
  zod = "/zod",
}
const Layout = ({ children }: { children: ReactNode }) => {
  const session = useSession();
  console.log(session);
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
      {children}
    </div>
  );
};

export default Layout;
