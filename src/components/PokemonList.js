// src/components/PokemonList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/pokemon.css';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
      const detailedPokemonList = await Promise.all(response.data.results.map(async (pokemon) => {
        const pokemonDetails = await axios.get(pokemon.url);
        return {
          name: pokemon.name,
          url: pokemon.url,
          id: pokemonDetails.data.id,
          types: pokemonDetails.data.types.map(typeInfo => typeInfo.type.name),
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetails.data.id}.png`
        };
      }));
      setPokemonList(detailedPokemonList);
    };
    fetchData();
  }, []);

  return (
    <div className="pokemon-list">
      {pokemonList.map((pokemon, index) => (
        <div key={index} className="pokemon-card">
          <Link to={`/pokemon/${pokemon.name}`} className="pokemon-link">
            <img src={pokemon.imageUrl} alt={pokemon.name} />
            <div className="pokemon-name">{pokemon.name}</div>
            <div className="pokemon-types">
              {pokemon.types.map((type, index) => (
                <span key={index} className={`pokemon-type ${type}`}>{type}</span>
              ))}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
