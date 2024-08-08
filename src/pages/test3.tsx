import { hasQueryCache } from "@/components/react-query-cache/cache";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Test3 = () => {
  const query = useQuery({
    queryKey: ["test3"],
    queryFn: () => hasQueryCache,
  });
  return <div></div>;
};

export default Test3;
