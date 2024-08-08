import axios from "axios";

export const hasQueryCache = async (query: number) => {
  const { data } = await axios(
    `https://jsonplaceholder.typicode.com/todos/${query}`,
  );

  return data;
};
