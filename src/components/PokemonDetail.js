// src/components/PokemonDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/pokemon.css';

const PokemonDetail = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch basic Pokémon data
      const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      setPokemon(pokemonResponse.data);

      // Fetch species data to get the evolution chain URL
      const speciesResponse = await axios.get(pokemonResponse.data.species.url);
      const evolutionChainUrl = speciesResponse.data.evolution_chain.url;

      // Fetch the evolution chain data
      const evolutionChainResponse = await axios.get(evolutionChainUrl);
      const evolutionChainData = await parseEvolutionChain(evolutionChainResponse.data.chain);
      setEvolutionChain(evolutionChainData);
    };

    fetchData();
  }, [name]);

  const parseEvolutionChain = async (chain) => {
    let evolutions = [];
    let current = chain;
    while (current) {
      const speciesResponse = await axios.get(current.species.url);
      const pokemonId = speciesResponse.data.id;
      const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
      evolutions.push({
        name: current.species.name,
        imageUrl: imageUrl,
      });
      current = current.evolves_to[0];
    }
    return evolutions;
  };

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div className="pokemon-detail">
      <div className="pokemon-card">
        <h1 className="pokemon-name">{pokemon.name}</h1>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
        <p>Base Experience: {pokemon.base_experience}</p>
        <div className="pokemon-types">
          {pokemon.types.map((typeInfo, index) => (
            <span key={index} className={`pokemon-type ${typeInfo.type.name}`}>
              {typeInfo.type.name}
            </span>
          ))}
        </div>
      </div>
      <div className="pokemon-evolutions">
        <h2>Evolution Chain</h2>
        {evolutionChain.map((evolution, index) => (
          <div key={index} className="pokemon-evolution">
            <img src={evolution.imageUrl} alt={evolution.name} className="evolution-image" />
            <div className="evolution-name">{evolution.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonDetail;
