import React from 'react';
import { SearchBox } from './SearchBox';
import { Results } from './Results';
import { Facets } from './Facets';

export default function App() {
  return (
    <div>
      <h1>Pokémon Search</h1>
      <SearchBox />
      <div style={{ display: 'flex', gap: '20px' }}>
        <Facets />
        <Results />
      </div>
    </div>
  );
}