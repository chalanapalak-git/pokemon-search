import {useEffect, useState} from "react";
import {buildResultList} from "@coveo/headless";
import {engine} from "./engine";

const resultList = buildResultList(engine);

export function Results() {
  const [state, setState] = useState(resultList.state);

  useEffect(() => {
    const unsubscribe = resultList.subscribe(() => {
      setState({...resultList.state});
    });

    return unsubscribe;
  }, []);

  if (!state.results.length) {
    return <div>No results</div>;
  }

  return (
    <div>
      <h3>Results</h3>

      {state.results.map(result => (
        <div
          key={result.uniqueId}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px"
          }}
        >
          {/* Pokemon Image */}
          <img
            src={result.raw.pokemon_image as string}
            alt={result.title}
            width="80"
            style={{marginRight: "15px"}}
          />

          {/* Pokemon Info */}
          <div>
            <strong>{result.title}</strong>
            <div>Type: {result.raw.pokemon_type as string}</div>
            <div>Generation: {result.raw.pokemon_generation as string}</div>
          </div>
        </div>
      ))}
    </div>
  );
}