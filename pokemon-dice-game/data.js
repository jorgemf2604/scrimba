function getPokemons(numberOfPokemons) {
    const baseURL = "https://pokeapi.co/api/v2/pokemon";
    
    // create array with number of url pokemons 
    const pokemonUrls = []
    for(let pokemonID = 1; pokemonID <= numberOfPokemons; pokemonID++) {
        pokemonUrls.push(`${baseURL}/${pokemonID}`);
    };
    
    // convert into an array of promises
    const pokemonPromises = pokemonUrls.map(url => fetch(url));
    
    return Promise.all(pokemonPromises)
    .then(responses => Promise.all(responses.map(response => response.json())));
}

export {getPokemons}

