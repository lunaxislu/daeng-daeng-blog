import axios from "axios";

const DYNAMIC_API_QURIES = [
  { api_type: "animal_hospital", query_type: "LOCALDATA_020301_" },
  { api_type: "animal_pharmacy", query_type: "LOCALDATA_020302_" },
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
          `${process.env.NEXT_PUBLIC_SEOUL_API_URL}`,
          {
            area,
            api_type: query.api_type, // api router에서 조건부 함수 처리위해서
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
