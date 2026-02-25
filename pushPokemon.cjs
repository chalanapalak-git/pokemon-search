// pushPokemon.cjs
const axios = require("axios");
const cheerio = require("cheerio");

// ====== CONFIGURATION ======
const ORG_ID = "pumldoscdaxbxx62xcz5ja4cpiy";
const API_KEY = "xxe66a71be-a918-47b8-92ef-0da07e660e0c";
const SOURCE_ID = "pumldoscdaxbxx62xcz5ja4cpiy-vo32s3o6tddpu53gzz5wzpkkzu";

const BASE_PUSH_URL = `https://api.cloud.coveo.com/push/v1/organizations/${ORG_ID}/sources/${SOURCE_ID}/documents`;

// Example Pokémon list (add more as needed)
const pokemonList = ["charmeleon", "caterpie", "clefairy"];

// ====== FETCH POKEMON DATA ======
async function fetchPokemon(name) {
  const url = `https://pokemondb.net/pokedex/${name}`;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  // 1️⃣ Name
  const title = $("h1").first().text().trim() || name;

  // 2️⃣ Image from grid-col span-md-6 span-lg-4 text-center
  let image = null;
  const imageDiv = $(".grid-col.span-md-6.span-lg-4.text-center").first();
  if (imageDiv.length) {
    image = imageDiv.find("p a picture img").attr("src") || null;
  }

  // 3️⃣ Types from vitals-table
  const types = [];
  $(".vitals-table a[href*='/type/']").each((i, el) => {
    types.push($(el).text().trim());
  });

  // 4️⃣ Generation from page text
  const pageText = $.text();
  let generation = null;
  const genMatch = pageText.match(/introduced in Generation (\d+)/i);
  if (genMatch) generation = parseInt(genMatch[1], 10);

  return {
    title,
    image,
    types,
    generation,
    uri: url,
    body: data || "<html></html>" // always send something
  };
}

// ====== PUSH TO COVEO ======
async function pushToCoveo(pokemon) {
  try {
    const documentId = pokemon.uri; // unique per Pokémon
    const response = await axios.put(
      `${BASE_PUSH_URL}?documentId=${encodeURIComponent(documentId)}`,
      {
        title: pokemon.title,
        data: pokemon.body,
        fileExtension: ".html",
"pokemon_type": pokemon.types.join(","),     // multiple types as CSV
          "pokemon_generation": pokemon.generation !== null ? pokemon.generation.toString() : "0",
          "pokemon_image": pokemon.image || "",
fields: {
        "pokemon_type": pokemon.types.join(","),     // multiple types as CSV
          "pokemon_generation": pokemon.generation !== null ? pokemon.generation.toString() : "0",
          "pokemon_image": pokemon.image || ""
      },
metadata: {
        "pokemon_type": pokemon.types.join(","),     // multiple types as CSV
          "pokemon_generation": pokemon.generation !== null ? pokemon.generation.toString() : "0",
          "pokemon_image": pokemon.image || ""
      }

      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log(`✅ Indexed: ${pokemon.title}`);
    console.log(`   generation: ${pokemon.generation}`);
    console.log(`   type: ${pokemon.types.join(",")}`);
    console.log(`   image: ${pokemon.image}`);
    console.log("   HTTP status:", response.status, "\n");
  } catch (err) {
    console.error(`❌ Failed to index ${pokemon.title}:`, err.response?.data || err.message);
  }
}

// ====== RUN PUSH ======
async function run() {
  for (const name of pokemonList) {
    const pokemon = await fetchPokemon(name);
    await pushToCoveo(pokemon);
  }
}

run();