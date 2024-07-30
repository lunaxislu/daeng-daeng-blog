import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import useAuthStore from "../auth/withZustand/hook/useAuthState";
import { useSession } from "next-auth/react";
const HOME = "/" || "/zod" || "/auth-zustand";

enum Pages {
  home = "/",
  zod = "/zod",
}
const Layout = ({ children }: { children: ReactNode }) => {
  const session = useSession();

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
      </div>
      {children}
    </div>
  );
};

export default Layout;
