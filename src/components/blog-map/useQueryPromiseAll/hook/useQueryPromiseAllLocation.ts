import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { refineSeoulApiData, T_LocationType } from "../../const/const";
import { skipToken, useQuery } from "@tanstack/react-query";
interface TLocationType {
  api_query: T_LocationType | null;
}

const DYNAMIC_API_QURIES = [
  { query_key: "LOCALDATA_020301_" },
  { query_key: "LOCALDATA_020302_" },
];

const useQueryPromiseAllLocation = (props: TLocationType) => {
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
  const ParalledQueriesAnimalMedicineAPI = async (api_query: string | null) => {
    try {
      const results = await Promise.all(
        DYNAMIC_API_QURIES.map(async (query) => {
          const result = await axios.post(
            `${process.env.NEXT_PUBLIC_QUERY_API_URL}`,
            {
              api_query,
              query_key: query.query_key,
            },
          );
          return result.data;
        }),
      );

      return results;
    } catch (err) {
      console.log(err, "map Error");
      return []; // 성공 실패시 균일하게 해주기 위해서
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["useQuery+PromiseAll", api_query],
    queryFn: () => ParalledQueriesAnimalMedicineAPI(api_query),
    enabled: !!api_query && api_query === cachedQueryState, // useCallback,useMemo 하면 되는데 귀찮아서 이걸로 리렌더링 방지
    select: (data) => {
      const result = refineSeoulApiData(data);
      ref.current.end = performance.now();
      return result;
    },
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return {
    data,
    ref,
  };
};

export default useQueryPromiseAllLocation;
