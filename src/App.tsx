import {useEffect} from "react";
import {SearchBox} from "./SearchBox";
import {TypeFacet} from "./TypeFacet";
import {GenerationFacet} from "./GenerationFacet";
import {Results} from "./Results";
import {engine} from "./engine";

function App() {
  useEffect(() => {
    engine.executeFirstSearch();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
    <h1>Pokémon Search</h1>
      <SearchBox />
      <TypeFacet />
      <GenerationFacet />
      <Results />
    </div>
  );
}

export default App;