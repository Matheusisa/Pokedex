// src/components/Header.js
import React from 'react';
import './Header.css';
import pokedexImage from '../assets/pokedex.png'; // Certifique-se de que esta imagem existe no caminho correto

const Header = () => {
  return (
    <header className="header">
      <img src={pokedexImage} alt="Pokedex" className="header-image" />
      <h1 className="header-title">POKEDEX</h1>
    </header>
  );
};

export default Header;
