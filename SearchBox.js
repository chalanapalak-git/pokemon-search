// SearchBox.js
import React, { useState } from 'react';
import { buildSearchBox } from '@coveo/headless';
import { engine } from './engine';

const searchBoxController = buildSearchBox(engine);

export function SearchBox() {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    searchBoxController.updateText(query);
    searchBoxController.submit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}