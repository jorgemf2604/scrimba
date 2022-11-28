import { getPokemons } from "./data.js";
import { Character } from "./Character.js";

// helper functions

function renderCharacter(character, container) {
  let template = `
    <p>${character.name}</p>
    <img src="${character.image}" />
    <p>Health: ${character.currentHealth}</p>
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
  let hero = pokemonData.filter(pokemon => pokemon.name === "jigglypuff")[0];
  let foe = pokemonData[Math.floor(Math.random() * 100) + 1];
  hero = new Character(hero);
  foe = new Character(foe);

  // render characters
  renderCharacter(hero, ".hero-card");
  renderCharacter(foe, ".foe-card");
  // event listener
  document.querySelector(".attack-btn").addEventListener("click", e => {
    console.log("attack");
    // create an handle for the attact button
  });
});

