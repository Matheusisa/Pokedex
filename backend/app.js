const express = require('express');
const app = express();

const pokemonRoutes = require('./routes/pokemon');

app.use('/api/pokemon', pokemonRoutes);

module.exports = app;
