import React from "react";

import { useState } from "react";

import { ParalledQueriesAnimalMedicineAPI } from "@/components/blog-map/mixed-content/api";
import {
  SEOUL_LOCATION,
  SEOUL_QUERY,
} from "@/components/blog-map/mixed-content/const";
import { useQuery } from "@tanstack/react-query";
import { refineSeoulApiData } from "../components/blog-map/mixed-content/util";
import axios from "axios";
const HasMixedContent = ({ endRange }: { endRange: string }) => {
  const [query, setQuery] = useState<string | null>(null);
  /**
   * @param LOCALDATA_020301_${api_query}/01/endPoint
   */
  const getAnimalHospitalData = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_ANIMAL_MEDICINE}`,
  });
  /**
   * @param LOCALDATA_020302_${api_query}/01/endPoint
   */
  const getAnimalPharamcyData = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_ANIMAL_MEDICINE}`,
  });
  const getDataArr = [
    getAnimalHospitalData("LOCALDATA_020301_DB/1/1000/01"),
    getAnimalPharamcyData("LOCALDATA_020302_DB/1/1000/01"),
  ];

  const getParalledData = async () => {
    try {
      const results = await axios("/api/mixedError/hasMixedContent");
      return results.data;
    } catch (err) {
      console.log(err);
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["ANIMAL"],
    queryFn: getParalledData,
    enabled: !!query,
  });
  console.log(data);
  return (
    <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: "20px" }}>
        {SEOUL_LOCATION.map((Area) => (
          <span
            onClick={() => setQuery(Area.api_query)}
            key={Area.location}
            style={{
              width: "80px",
              backgroundColor: "wheat",
              color: "black",
              height: "80px",
              textAlign: "center",
            }}
          >
            {Area.location}
          </span>
        ))}
      </div>
      <div style={{ alignSelf: "center", fontSize: "24px" }}>
        데이터가 mixed content없이 불러와진{" "}
        <span
          style={{
            textDecoration: "underline",
            color: "bisque",
            fontSize: "32px",
          }}
        >
          {isLoading ? "로딩중..." : data?.length + "개"}
        </span>{" "}
      </div>
    </div>
  );
};

export default HasMixedContent;
