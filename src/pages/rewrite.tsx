import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Rewrite = () => {
  const route = useRouter();
  const [data, setData] = useState({
    originalUrl: "",
    resolvedUrl: "",
    res: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post("/api/rewrite/rewrite");
      console.log("🚀 ~ fetchData ~ result:", result);

      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Rewrite Page</h1>
      <p>Original URL: {data.originalUrl}</p>
      <p>Resolved URL: {data.resolvedUrl}</p>
    </div>
  );
};

export default Rewrite;
