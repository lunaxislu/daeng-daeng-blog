import axios from "axios";
import React from "react";
/**
 * @param LOCALDATA_020301_${api_query}/01/endPoint
 */
const hospitalInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_QUERIES_API_URL}`,
});
/**
 * @param LOCALDATA_020302_${api_query}/01/endPoint
 */
const pharmacyInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_QUERIES_API_URL}`,
});

const getHospitalData = async (api_query: string) => {
  hospitalInstance(`LOCALDATA_020301_${api_query}/1/500/01`);
};
const getPharmacyData = async (api_query: string) => {
  pharmacyInstance(`LOCALDATA_020302_${api_query}/1/500/01`);
};
const DYNAMIC_API_QURIES = [getHospitalData, getPharmacyData];
const useQueryPromiseAllLocation = () => {};

export default useQueryPromiseAllLocation;
