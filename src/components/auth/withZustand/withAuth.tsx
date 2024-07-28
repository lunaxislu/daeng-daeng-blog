import React, { ReactNode, useEffect } from "react";
import useAuthStore from "./hook/useAuthState";
import { useRouter } from "next/router";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const Component = () => {
    const isLogin = useAuthStore((state) => state.isLogin);
    const router = useRouter();

    useEffect(() => {
      if (!isLogin) router.push("/login");
      if (isLogin) router.push("/");
    }, [isLogin]);
    return <WrappedComponent />;
  };
  return Component;
};

export default withAuth;

// const withAuth =
//   <P,>(WrappedComponent: React.ComponentType<P>) =>
//   (props: React.PropsWithChildren<P>) => {
//     const [cookies] = useCookies();
//     const router = useRouter();

//     useEffect(() => {
//       const accessToken = cookies.get("accessToken");

//       if (!accessToken) {
//         router.push("/login");
//       }
//     }, []);

//     return <WrappedComponent {...props} />;
//   };
