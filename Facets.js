// Facets.js
import React from 'react';
import { typeFacet, generationFacet } from './buildFacet';

export function Facets() {
  return (
    <div>
      <h4>Type</h4>
      {typeFacet.state.values.map(v => (
        <label key={v.value}>
          <input
            type="checkbox"
            checked={v.state === 'selected'}
            onChange={() => typeFacet.toggleSelect(v.value)}
          />
          {v.value} ({v.numberOfResults})
        </label>
      ))}

      <h4>Generation</h4>
      {generationFacet.state.values.map(v => (
        <label key={v.value}>
          <input
            type="checkbox"
            checked={v.state === 'selected'}
            onChange={() => generationFacet.toggleSelect(v.value)}
          />
          {v.value} ({v.numberOfResults})
        </label>
      ))}
    </div>
  );
}