import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';

export default function usePokemonList(url) {
     const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: url,
        nextUrl: '',
        prevUrl: ''
      });
     
      async function downloadPokemon() {
        setPokemonListState((state)=>({...state,isLoading:false}))
        const response = await axios.get(pokemonListState.pokedexUrl);
        const pokemonResult = response.data.results;
    
        setPokemonListState((state)=>({...state ,nextUrl: response.data.next,prevUrl: response.data.previous}));

        
          setPokemonListState((state)=>(
{            ...state,pokemonList:response.data.pokemon.slice(0,5)}
          ))
       
      
        const pokemonResultPromise = pokemonResult.map((pokemon) =>
          axios.get(pokemon.url)
        );
       
        const pokemonData = await axios.all(pokemonResultPromise);
      
        const result = pokemonData.map((pokeData) => {
          const pokemon = pokeData.data;
          return {
            id: pokemon.id,
            name: pokemon.name,
            height: pokemon.height,
    
            image: pokemon.sprites.other
              ? pokemon.sprites.other.dream_world.front_default
              : pokemon.sprites.front_shiny,
            types: pokemon.types
          };
        });
        
        setPokemonListState((state)=>({...state,pokemonList:result,isLoading: false}))
    
        
         
      }

      useEffect(()=>{
        downloadPokemon();
      },[pokemonListState.pokedexUrl])
    return {
        pokemonListState,setPokemonListState
    }
}
