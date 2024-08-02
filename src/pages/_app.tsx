import useAuthStore, {
  getAllAuthValue,
  setAuthInSession,
} from "@/components/auth/withZustand/hook/useAuthState";
import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";
import {
  HydrationBoundary,
  Query,
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { SessionProvider, signOut } from "next-auth/react";
import type { AppProps } from "next/app";
import {
  DependencyList,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 6000000,
            // refetchOnMount: false,
            // refetchOnWindowFocus: false,
            gcTime: 8000000000000000,
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydrateState}>
        <SessionProvider refetchOnWindowFocus={false}>
          <Layout>
            <ReactQueryDevtools initialIsOpen={false} />
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
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
