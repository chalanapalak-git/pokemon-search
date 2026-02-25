import React from 'react';
import { buildFacet } from '@coveo/headless';
import { engine } from './engine';

const typeFacet = buildFacet(engine, { field: 'pokemon_type' });
const genFacet = buildFacet(engine, { field: 'pokemon_generation' });
const imgFacet = buildFacet(engine, { field: 'pokemon_image' });

export function Facets() {
  return (
    <div>
      <h3>Type</h3>
      {typeFacet.state.values.map((v) => (
        <label key={v.value}>
          <input
            type="checkbox"
            onChange={() => typeFacet.toggleSelect(v.value)}
          />
          {v.value} ({v.numberOfResults})
        </label>
      ))}

      <h3>Image</h3>
      {imgFacet.state.values.map((v) => (
        <label key={v.value}>
          <input
            type="checkbox"
            onChange={() => imgFacet.toggleSelect(v.value)}
          />
          {v.value} ({v.numberOfResults})
        </label>
      ))}


      <h3>Generation</h3>
      {genFacet.state.values.map((v) => (
        <label key={v.value}>
          <input
            type="checkbox"
            onChange={() => genFacet.toggleSelect(v.value)}
          />
          {v.value} ({v.numberOfResults})
        </label>
      ))}
    </div>
  );
}