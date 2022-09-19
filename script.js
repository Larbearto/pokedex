const poke_container = document.getElementById('poke-container')
const pokemon_count = 150
const colors = {
  fire: '#ED944D',
  grass: '#6EA893',
  electric: '#EDD94C',
  water: '#99D1D5',
  ground: '#B88D6F',
  rock: '#B4A8A4',
  fairy: '#D288A2',
  poison: '#98D7A5',
  bug: '#F8D5A3',
  dragon: '#97B3E6',
  psychic: '#D2BF37',
  flying: '#7AAECA',
  fighting: '#761F17',
  normal: '#757574'
}

const main_types = Object.keys(colors)
console.log(main_types)

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i)
  }
}

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const res = await fetch(url)
  const data = await res.json()

  createPokemonCard(data)
}

const createPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement('div')
  pokemonEl.classList.add('pokemon')

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
  const id = pokemon.id.toString().padStart(3, '0')

  const poke_types = pokemon.types.map((type) => type.type.name)
  const type = main_types.find((type) => poke_types.indexOf(type) > -1)
  const color = colors[type]

  pokemonEl.style.backgroundColor = color

  const pokemonInnerHTML = `
    <div class="img-container">
		<img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png" alt="">
	</div>
	<div class="info">
		<span class="number">#${id}</span>
		<h3 class="name">${name}</h3>
		<small class="type">Type: <span>${type}</span> </small>
	</div>
    `

  pokemonEl.innerHTML = pokemonInnerHTML

  poke_container.appendChild(pokemonEl)
}

fetchPokemons()
