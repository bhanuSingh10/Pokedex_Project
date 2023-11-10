import React, { useCallback, useState } from "react";
// import axios from "axios";
// import { useEffect } from "react";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../../hooks/usePokemonList";


export default function PokemonList() {
const {pokemonListState,setPokemonListState}=usePokemonList(`https://pokeapi.co/api/v2/pokemon`,false);
  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {pokemonListState.isLoading
          ? "Loading..."
          : pokemonListState.pokemonList.map((p) => (
              <Pokemon
                name={p.name}
                image={p.image}
                key={p.id}
                height={p.height}
                weight={p.weight}
                id={p.id}
                
              />
            ))}
      </div>

      <div className="button">
        <button
          disabled={pokemonListState.prevUrl === null}
          onClick={() => {
            setPokemonListState({...pokemonListState,pokedexUrl:pokemonListState.prevUrl});
          }}
        >
          PREV
        </button>
        <button
          disabled={pokemonListState.nextUrl === null}
          onClick={() => {
           setPokemonListState({...pokemonListState,pokedexUrl:pokemonListState.nextUrl});
          }}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
