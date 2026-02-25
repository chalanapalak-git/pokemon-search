import React, {useEffect, useState} from "react";
import {buildFacet} from "@coveo/headless";
import {engine} from "./engine";

const generationFacet = buildFacet(engine, {
  options: {
    field: "pokemon_generation",
    numberOfValues: 10,
  },
});

export function GenerationFacet() {
  const [state, setState] = useState(generationFacet.state);

  useEffect(() => {
    const unsubscribe = generationFacet.subscribe(() =>
      setState(generationFacet.state)
    );
    return unsubscribe;
  }, []);

  if (!state.values.length) return <div>No generations</div>;

  return (
    <div>
      <h3>Filter by Generation</h3>

      {state.values.map(v => (
        <div key={v.value}>
          <label>
            <input
              type="checkbox"
              checked={v.state === "selected"}
              onChange={() => generationFacet.toggleSelect(v)}
            />
            Generation {v.value} ({v.numberOfResults})
          </label>
        </div>
      ))}
    </div>
  );
}