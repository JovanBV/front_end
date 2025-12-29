
function retrieveFirstPokemon (idOne, idTwo, idTree){
    const pokemonOne = fetch(`https://pokeapi.co/api/v2/pokemon/${idOne}`).then(result => {return result.json()})
    const pokemonTwo = fetch(`https://pokeapi.co/api/v2/pokemon/${idTwo}`).then(result => {return result.json()})
    const pokemonTree = fetch(`https://pokeapi.co/api/v2/pokemon/${idTree}`).then(result => {return result.json()})

    return Promise.any([pokemonOne, pokemonTwo, pokemonTree])
        .then(
            results => {
                return results.name;
            })
        .catch(error => {
            throw new Error(`Error retrieving pokemons: ${error}`)
        })
    
}

const result = retrieveFirstPokemon(1,2,8);
result