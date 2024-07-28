import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import useAuthStore from "../auth/withZustand/hook/useAuthState";
const HOME = "/" || "/zod" || "/auth-zustand";

enum Pages {
  home = "/",
  zod = "/zod",
}
const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const isLogin = useAuthStore((state) => state.isLogin);
  useEffect(() => {
    if (
      (!isLogin && router.pathname === Pages.home) ||
      router.pathname === Pages.zod
    ) {
      router.push("/auth-zustand");
    }
  }, [router.pathname, isLogin]);
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
        Header입니다.
      </div>
      {children}
    </div>
  );
};

export default Layout;
