import React, { useState } from "react";
import { SEOUL_LOCATION, T_LocationType } from "../const/const";
import useQueriesLocation from "./hook/useQueriesLocation";

const UseQueriesMeasure = () => {
  const [apiQueryState, setApiQueryState] = useState<T_LocationType | null>(
    null
  );
  const { results } = useQueriesLocation({ api_query: apiQueryState });
  console.log(results?.length);
  return (
    <div>
      <div className="flex gap-11 flex-wrap">
        {SEOUL_LOCATION.map((loc) => (
          <button
            style={{
              padding: "20px",
              backgroundColor: "skyBlue",
              border: "1px solid black",
            }}
            key={loc.api_query}
            onClick={() => setApiQueryState(loc.api_query)}
          >
            {loc.location}
          </button>
        ))}
      </div>
      <p className="p-10 bg-slate-500 flex justify-center font-bold text-6xl">
        <span>{apiQueryState}</span>
      </p>
    </div>
  );
};

export default UseQueriesMeasure;
