import React, { useEffect, useRef, useState } from "react";
import { refineSeoulApiData, T_LocationType } from "../../const/const";
import axios from "axios";
import { useQueries } from "@tanstack/react-query";
interface TLocationType {
  api_query: T_LocationType | null;
}

const DYNAMIC_API_QURIES = [
  { query_key: "LOCALDATA_020301_" },
  { query_key: "LOCALDATA_020302_" },
];

const useQueriesLocation = (props: TLocationType) => {
  const { api_query } = props;
  // useCallback,useMemo 하면 되는데 귀찮아서 이걸로 리렌더링 방지
  const [cachedQueryState, setCachedQueryState] = useState<string | null>(null);
  // performance 측정할 ref
  const ref = useRef<{
    start: null | number;
    end: null | number;
  }>({
    start: null,
    end: null,
  });

  useEffect(() => {
    if (api_query !== cachedQueryState) {
      setCachedQueryState(api_query);
      ref.current.start = performance.now();
    }
  }, [cachedQueryState, api_query]);
  const queries = DYNAMIC_API_QURIES.map(({ query_key }) => ({
    queryKey: ["ORIGIN", api_query, query_key],
    queryFn: async () => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_QUERIES_API_URL}`,
        {
          api_query,
          query_key,
        }
      );
      return response.data; // 데이터를 반환
    },
    enabled: !!api_query && api_query === cachedQueryState, // useCallback,useMemo 하면 되는데 귀찮아서 이걸로 리렌더링 방지
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  }));

  const results = useQueries({
    queries,
    combine(results) {
      const allSuccess = results.every((result) => result.status === "success");

      if (allSuccess) {
        const refinedResults = results.map((result) => result.data);
        const allResults = refineSeoulApiData(refinedResults);
        ref.current.end = performance.now();
        return allResults;
        // 여기서 데이터를 처리할 수 있습니다.
        // 예: setProcessedData(allResults);
      }
    },
  });

  return {
    results,
    ref,
  };
};

export default useQueriesLocation;
