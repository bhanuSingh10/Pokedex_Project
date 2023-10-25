import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './PokemonList.css'
import Pokemon from '../Pokemon/Pokemon';

export default function PokemonList() {
   
  //  use effect expect-callback adn depedency array 
  //  it execute with render first time
  // dependency array-aray kisi ma change hota hai to depedency arraay ko dubara rerender karo
  // axios-alternative of fetch api

    const [PokemonList,setPokemonList]=useState([]);
   
    const [isLoading,setLoading]=useState(true);

     async function downloadPokemon(){
      const response=await axios.get('https://pokeapi.co/api/v2/pokemon'); //download list of 20 pokemon
      // console.log(response.data);
      const pokemonResult=response.data.results; //we get the array of pokemon from result
      console.log(response.data);

      //iterating over the array of poekmons, and using their url , to create an array of promises  that will download those 20 poekmon
      const 
      pokemonResultPromoise=pokemonResult.map((pokemon)=>axios.get(pokemon.url));

      //passing that promise array to axos.all
       const pokemonData=await axios.all(pokemonResultPromoise); //array of 20 pokemon detailed data
       console.log(pokemonData);

      //  iterate on the data of each pokemon and extract id image name type
       const res=pokemonData.map((pokeData)=>{
        const pokemon=pokeData.data;
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: (pokemon.sprites.other)? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
          type:pokemon.types
          

        }
       })
        // setPokemonList(pokemonData.map(pokemon=>{ const res=pokemon=pokemonData.data;
        //   return {name: pokemon.name,image: (pokemonData.sprites.other)? pokemonData.sprites.other.dream_world.front_default : pokemonData.sprites.front_shiny
        //   , types: pokemon.types}
        // }
          
          // )
        // );
        console.log(res);
        setPokemonList(res);
      setLoading(false);
     }
    useEffect( ()=>{downloadPokemon();}
    ,[]);
    return (
    <div className='pokemon-list-wrapper'>
   <div>list of pokemons</div>   
      {(isLoading)?'Loading....':
      PokemonList.map((p)=> <Pokemon name={p.name} image={p.image} key={p.id}/>)
      }
    </div>
  )
}
