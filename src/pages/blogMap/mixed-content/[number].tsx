import MixedContent from "@/components/blog-map/mixed-content/MixedContent";
import { useRouter } from "next/router";

import React, { Fragment, useState } from "react";

const MixedContentError = () => {
  const { query } = useRouter();

  const number = query.number as string;
  return <MixedContent endRange={number} />;
};

export default MixedContentError;
