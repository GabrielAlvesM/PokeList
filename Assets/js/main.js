const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.querySelector("#loadMore")
const maxRecord = 151;
const limit = 5;
let offset = 0;



function convertPokemonToLi(pokemon) {
    return `
            <li class="pokemon ${pokemon.type}">
                        <div class="info">
                            <span class="name">${pokemon.name}</span>
                            <span class="number">#${pokemon.number}</span>
                        </div>
                        <div class="other">
                            <ol class="types">
                                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(' ')}
                            </ol>

                            <img src="${pokemon.photo}" alt="${pokemon.name}">
                        </div>
                </li>
        `
}

function loadPokemonList(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
                    <div class="info">
                        <span class="name">${pokemon.name}</span>
                        <span class="number">#${pokemon.number}</span>
                    </div>
                    <div class="other">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(' ')}
                        </ol>

                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
            </li>`).join('')
    })
}
loadPokemonList(offset, limit);
loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtRecord = offset + limit;
    if(qtRecord >= maxRecord){
        const newLimit =  maxRecord - offset
        loadPokemonList(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
        return 
    }else{
        loadPokemonList(offset, limit);
    }
})
