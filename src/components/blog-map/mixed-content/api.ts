import axios from "axios";

const DYNAMIC_API_QURIES = [
  { query_type: "LOCALDATA_020301_" },
  { query_type: "LOCALDATA_020302_" },
];

// process.env.NEXT_PUBLIC_SEOUL_API_URL은 api router 주소입니다.
export const ParalledQueriesAnimalMedicineAPI = async (
  area: string | null,
  endRange: string,
) => {
  try {
    const results = await Promise.all(
      DYNAMIC_API_QURIES.map(async (query) => {
        const result = await axios.post(
          `${process.env.NEXT_PUBLIC_MY_API_URL}`,

          {
            area,
            query_type: query.query_type, // 동물병원 || 동물약국 query
            endRange,
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
// process.env.NEXT_PUBLIC_SEOUL_API_URL은 api router 주소입니다.
export const hasMixedContentParalledQueries = async (
  area: string | null,
  endRange: string,
) => {
  try {
    const results = await Promise.all(
      DYNAMIC_API_QURIES.map(async (query) => {
        const result = await axios.post(
          `/api/mixedError/hasMixedContent`,

          {
            area,
            query_type: query.query_type, // 동물병원 || 동물약국 query
            endRange,
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
