// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { Router } = require('express');
const { getPokemons, pokemonID, PokemonPost, getPokeName, deletePokemonById } = require('../controllers/ControllerPokemon')
const { GetTypes } = require('../controllers/ControllerTypes')


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const router = Router();
router.get('/pokemons', getPokemons)
router.get('/pokemonss', getPokeName,)
router.get('/types', GetTypes)
router.get('/pokemons/:id', pokemonID)
router.post('/pokemon', PokemonPost)


module.exports = router;
