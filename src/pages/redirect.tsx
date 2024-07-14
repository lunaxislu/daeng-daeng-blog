import { useRouter } from "next/router";
import React from "react";

const Redirect = () => {
  const router = useRouter();
  console.log(router);
  return <div>Redirect</div>;
};

export default Redirect;
