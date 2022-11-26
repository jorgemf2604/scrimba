import { getPokemons } from "./data.js";

// helper functions

function renderCharacter(character, container) {
  let template = `
    <p>${character.name}</p>
    <img src="${character.image}" />
    <p>Health: 60</p>
    <div class="health-bar"></div>
    <div class="dice-container"></div>
  `;
  document.querySelector(container).innerHTML = template;
}

// fetch pokemons
getPokemons(100)
.then(pokemons => {
  let pokemonData = [];
  for(let pokemon of pokemons) {
    pokemonData.push({
      name: pokemon.name,
      image: pokemon.sprites.other["official-artwork"]["front_default"],
    })
  };
  // pick hero/foe and filter them out from the array
  const hero = pokemonData.filter(pokemon => pokemon.name === "jigglypuff")[0];
  const foe = pokemonData[0];
  // render characters
  renderCharacter(hero, ".hero-card");
  renderCharacter(foe, ".foe-card");
});

