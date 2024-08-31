import React, { useEffect, useState } from "react";
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
  const [cachedQueryState, setCachedQueryState] = useState<string | null>("");

  useEffect(() => {
    if (api_query !== cachedQueryState) {
      setCachedQueryState(api_query);
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
    enabled: !!api_query && api_query === cachedQueryState,
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
        return allResults;
        // 여기서 데이터를 처리할 수 있습니다.
        // 예: setProcessedData(allResults);
      }
    },
  });

  return {
    results,
  };
};

export default useQueriesLocation;
