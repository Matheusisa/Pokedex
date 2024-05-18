const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error retrieving Pokémon data');
  }
});

module.exports = router;
