import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Head from "next/head";
import React from "react";
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
const getDataArr = [
  getAnimalHospitalData("LOCALDATA_020301_DB/1/30/01"),
  getAnimalPharamcyData("LOCALDATA_020302_DB/1/30/01"),
];

const getParalledData = async () => {
  try {
    const results = await Promise.all(getDataArr);
    return results;
  } catch (err) {
    console.log(err);
  }
};
const MixedContentError = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ANIMAL"],
    queryFn: getParalledData,
  });

  console.log(data);
  return (
    <Head>
      <meta
        httpEquiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      />
      <div>MixedContentError</div>;
    </Head>
  );
};

export default MixedContentError;
