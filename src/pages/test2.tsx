import { hasQueryCache } from "@/components/react-query-cache/cache";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Test2 = () => {
  const query = useQuery({
    queryKey: ["test2"],
    queryFn: () => hasQueryCache,
  });
  return <div></div>;
};

export default Test2;
