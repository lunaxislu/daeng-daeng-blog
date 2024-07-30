import useAuthStore, {
  getAllAuthValue,
  setAuthInSession,
} from "@/components/auth/withZustand/hook/useAuthState";
import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider, signOut } from "next-auth/react";
import type { AppProps } from "next/app";
import { DependencyList, useCallback, useEffect, useRef } from "react";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: () => console.log("queryClient"),
    },
  },
});
export default function App({ Component, pageProps }: AppProps) {
  // const handleTabClosed = useCallback(async () => {
  //   localStorage.setItem("unload", "이벤트일어나냐?");
  //   await signOut();
  // }, []);
  // const UseDidMountEffect = (func: () => void, deps: DependencyList) => {
  //   const didMount = useRef(false);
  //   //https://velog.io/@tkp12345/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-%ED%83%AD-%EB%8B%AB%EC%9D%84%EC%8B%9C-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%ED%95%B8%EB%93%A4%EB%A7%81
  //   useEffect(() => {
  //     if (didMount.current) func();
  //     else didMount.current = true;
  //   }, deps);
  // };

  // UseDidMountEffect(() => {
  //   window.addEventListener("beforeunload", handleTabClosed);
  //   return () => window.removeEventListener("beforeunload", handleTabClosed);
  // }, [handleTabClosed]);
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider refetchOnWindowFocus={false}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </QueryClientProvider>
  );
}
