import React, {useEffect, useState} from "react";
import {buildFacet} from "@coveo/headless";
import {engine} from "./engine";

const typeFacet = buildFacet(engine, {
  options: {
    field: "pokemon_type",
    numberOfValues: 10,
  },
});

export function TypeFacet() {
  const [state, setState] = useState(typeFacet.state);

  useEffect(() => {
    const unsubscribe = typeFacet.subscribe(() =>
      setState(typeFacet.state)
    );
    return unsubscribe;
  }, []);

  if (!state.values.length) return <div>No types</div>;

  return (
    <div>
      <h3>Filter by Type</h3>

      {state.values.map(v => (
        <div key={v.value}>
          <label>
            <input
              type="checkbox"
              checked={v.state === "selected"}
              onChange={() => typeFacet.toggleSelect(v)}
            />
            {v.value} ({v.numberOfResults})
          </label>
        </div>
      ))}
    </div>
  );
}