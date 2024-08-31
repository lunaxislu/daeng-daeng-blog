import { useQueries, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

/**
 * @param LOCALDATA_020301_${api_query}/01/endPoint
 */
const getAnimalHospitalData = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_ANIMAL_HOSPITAL}`,
});
/**
 * @param LOCALDATA_020302_${api_query}/01/endPoint
 */
const getAnimalPharamcyData = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_ANIMAL_PHARAMCY}`,
});

const ParalePage = () => {
  const countRef = useRef(0);
  const getDataArr = [
    () => getAnimalHospitalData("LOCALDATA_020301_DB/1/1000/01"),
    () => getAnimalPharamcyData("LOCALDATA_020302_DB/1/1000/01"),
  ];
  const getParalledData = async () => {
    try {
      const results = await Promise.all(getDataArr);
      return results;
    } catch (err) {
      console.log(err);
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["ANIMAL"],
    queryFn: getParalledData,
  });
  useEffect(() => {
    countRef.current++;
  }, [data]);

  console.log("??");
  return <div>리렌더링 {countRef.current - 1} 번 일어납니다.</div>;
};

export default ParalePage;
