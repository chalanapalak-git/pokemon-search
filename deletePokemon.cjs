// deletePokemon.cjs
const axios = require("axios");

// ====== CONFIGURATION ======
const ORG_ID = "pumldoscdaxbxx62xcz5ja4cpiy";
const API_KEY = "xxe66a71be-a918-47b8-92ef-0da07e660e0c";
const SOURCE_ID = "pumldoscdaxbxx62xcz5ja4cpiy-vo32s3o6tddpu53gzz5wzpkkzu";

const BASE_PUSH_URL = `https://api.cloud.coveo.com/push/v1/organizations/${ORG_ID}/sources/${SOURCE_ID}/documents`;

// List of Pokémon to delete (same as you pushed before)
const pokemonList = ["charmeleon", "caterpie", "clefairy"];

// ====== DELETE FUNCTION ======
async function deletePokemon(name) {
  try {
    const documentId = `https://pokemondb.net/pokedex/${name}`;
    const encodedId = encodeURIComponent(documentId);

    const response = await axios.delete(`${BASE_PUSH_URL}?documentId=${encodedId}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    console.log(`✅ Deleted: ${name} | Status: ${response.status}`);
  } catch (err) {
    console.error(`❌ Failed to delete ${name}:`, err.response?.data || err.message);
  }
}

// ====== RUN DELETE ======
async function run() {
  for (const name of pokemonList) {
    await deletePokemon(name);
  }
  console.log("All deletions attempted.");
}

run();