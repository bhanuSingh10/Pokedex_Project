import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './PokemonDetails.css'
import { useParams } from 'react-router-dom'
import usePokemonList from '../../hooks/usePokemonList';
export default function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});

  async function downloadPokemon() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log(response.data);
    setPokemon({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height, // Fixed typo here
      types: response.data.types.map((e) => e.type.name)
    })
  }
// const [pokemonListState]=usePokemonList(`https://pokeapi.co/api/v2/type/${pokemon.types ? pokemon.types[0]:'fire'}`);

  useEffect(() => {
    downloadPokemon();
    // console.log('pokemon lsit state',pokemonListState);
  }, []);

  return (
    <div className='pokemon-details-wrapper'>
      <div className="name">name: {pokemon.name}</div>
      <img src={pokemon.image} alt="no image" />
      <div className="height">height: {pokemon.height}</div>
      <div className="weight">weight: {pokemon.weight}</div>
      <div className="type">{pokemon.types && pokemon.types.map((e) => <div key={e}>{e}</div>)}</div>
  <div>
 
  </div>
    </div>
  )
}
