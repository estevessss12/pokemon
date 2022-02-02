document.addEventListener('DOMContentLoaded',()=>{

    let nome = document.getElementById('nome').values;
    let botao = document.getElementById('botao');
    
    
    botao.addEventListener('click',()=>{
        
        
        const fetchPokemon = () =>{
            const urlNomePokemon = id =>`https://pokeapi.co/api/v2/pokemon/${id}`;
            const pokemonPromises = [];
            for(let i =1 ; i<=150 ; i++){
            pokemonPromises.push(fetch(urlNomePokemon(i)).then(response => response.json()));
            }
            Promise.all(pokemonPromises)
            .then(pokemons => {
                const listPokemons = pokemons.reduce((accumulator , pokemon) =>{
                  const types = pokemon.types.map(typeInfo => typeInfo.type.name);
                  accumulator +=`<li class="card">
                  <img class ="card-image" ${types[0]} "alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"/>
                  <h2 class="card-title">${pokemon.id}.${pokemon.name} </h2>
                  <p class="card-subtitle">${types.join(' | ')}</p>
                  </li>`;
                  return accumulator;
                },''); 

                const ul = document.querySelector('[data-js="pokedex"]');
    
                ul.innerHTML=listPokemons;
            });
        };
    
       fetchPokemon();
    });
    
});