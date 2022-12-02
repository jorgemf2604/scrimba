import { getPokemons } from "./data.js";
import { Character } from "./Character.js";

// helper functions

function renderCharacter(character, container) {
  const template = character.getCharacterHtml();
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
  // globals 
  let isGameOver = false;
  const foesArray = new Array(3).fill(0).map(() => pokemonData[Math.floor(Math.random() * 100) + 1]);

  function gameOver() {
    isGameOver = true;
    let message = null;
    if (hero.currentHealth === 0 && foe.currentHealth === 0) {
      message = "This is a tie!!";
    } else if (hero.currentHealth > 0) {
      message = "Jigglypuff is victorious. Revenge has been served";
    } else {
      message = "The evil pokemon horde has defeated brave Jigglypuff"
    }
    setTimeout(() => {
      document.body.innerHTML = `
        <div class="end-game">
          <h3><Game Over</h3>
          <h3>${message}</h3>
          <button class="reload">Play again</button>
        </div>
      `;

      document.querySelector(".reload").addEventListener("click", e => {
        location.reload();
      })

    }, 1500)
  }
  // get next monster
  function getNewFoe() {
    const nextFoe = foesArray.shift();
    return nextFoe ? new Character(nextFoe) : {};
  }

  // pick hero/foe and filter them out from the array
  let hero = pokemonData.filter(pokemon => pokemon.name === "jigglypuff")[0];
  let foe = pokemonData[Math.floor(Math.random() * 100) + 1];
  hero = new Character(hero);
  foe = getNewFoe()
  
  // render characters
  function render() {
    // render each character
    renderCharacter(hero, ".hero-card");
    renderCharacter(foe, ".foe-card");
  }
  render();
    
  // event listener

  document.querySelector(".attack-btn").addEventListener("click", e => {
    // cast dice and take damage
    if (!isGameOver) {
      hero.getDiceHtml();
      foe.getDiceHtml();
      hero.takeDamage(foe.diceValues);
      foe.takeDamage(hero.diceValues);
      render();

      // check for losers
      if (hero.isDead) {
        gameOver();
      } else if (foe.isDead) {
        isGameOver = true;
        if (foesArray.length > 0) {
          setTimeout(() => {
            foe = getNewFoe();
            isGameOver = false;
            renderCharacter(foe, ".foe-card");
          }, 1500);
        } else {
          gameOver();
        }
      }
    }
  });
});


