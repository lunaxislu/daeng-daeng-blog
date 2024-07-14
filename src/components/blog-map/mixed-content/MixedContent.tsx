import { Fragment, useState } from "react";

import { ParalledQueriesAnimalMedicineAPI } from "@/components/blog-map/mixed-content/api";
import {
  SEOUL_LOCATION,
  SEOUL_QUERY,
} from "@/components/blog-map/mixed-content/const";
import { useQuery } from "@tanstack/react-query";
import { refineSeoulApiData } from "./util";
const MixedContent = ({ endRange }: { endRange: string }) => {
  const [query, setQuery] = useState<string | null>(null);
  const { data, isLoading } = useQuery({
    queryKey: [SEOUL_QUERY.MEDICINE, query],
    queryFn: () => ParalledQueriesAnimalMedicineAPI(query, endRange),
    enabled: !!query,
    // enabled: !!api_query && api_type === 'hospital',
    select: refineSeoulApiData,
    // refetchOnWindowFocus: false,
    // staleTime: Infinity,
  });

  console.log(data);
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {SEOUL_LOCATION.map((Area) => (
        <span
          onClick={() => setQuery(Area.api_query)}
          key={Area.location}
          style={{
            width: "120px",
            backgroundColor: "wheat",
            color: "black",
            height: "80px",
            textAlign: "center",
          }}
        >
          {Area.location}
        </span>
      ))}
      <div>데이터가 mixed content없이 불러와진 {data?.length}</div>
    </div>
  );
};

export default MixedContent;
