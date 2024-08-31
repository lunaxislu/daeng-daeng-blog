import React, { useState } from "react";
import { SEOUL_LOCATION } from "../const/const";

const UseQueryPromiseAllMeasure = () => {
  const [apiQueryState, setApiQueryState] = useState<string>();
  return (
    <div>
      {SEOUL_LOCATION.map((loc) => (
        <div
          key={loc.api_query}
          onClick={() => setApiQueryState(loc.api_query)}
        >
          {loc.location}
        </div>
      ))}
    </div>
  );
};

export default UseQueryPromiseAllMeasure;
