// Results.js
import React from 'react';
import { buildResultList } from '@coveo/headless';
import { engine } from './engine';

const resultListController = buildResultList(engine);

export function Results() {
  const results = resultListController.state.results;

  return (
    <div>
      {results.map((r) => (
        <div key={r.uniqueId} className="pokemon-result">
          <img src={r.raw.pokemon_image} width="120" alt={r.title} />
          <h3>{r.title}</h3>
          <p>Type: {r.raw.pokemon_type.join(', ')}</p>
          <p>Generation: {r.raw.pokemon_generation}</p>
        </div>
      ))}
    </div>
  );
}