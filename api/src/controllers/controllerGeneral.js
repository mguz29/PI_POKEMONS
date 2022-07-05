const axios = require('axios')
const { Pokemon, Type } = require('../db')

const getApiInfo = async () => {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=100')
    const apiUrl = response.data.results.map((el) => axios.get(el.url))
    const allPokemons = await axios.all(apiUrl)
    const apiInfo = allPokemons.map(e => {
        return {
            id: e.data.id,
            name: e.data.name,
            height: e.data.height,
            weight: e.data.weight,
            hp: e.data.stats[0].base_stat,
            attack: e.data.stats[1].base_stat,
            defense: e.data.stats[2].base_stat,
            speed: e.data.stats[5].base_stat,
            TypePrimary: e.data.types[0].type.name,
            TypeSecond: e.data.types[1]?.type.name,
            image: e.data.sprites.other.dream_world.front_default
            // image:e.data.sprites.versions['generation-v']['black-white'].animated.front_default
        }
    })
    return apiInfo

}


const getDbInfo = async () => {
    const todos = await Pokemon.findAll({ include: Type })
    const pokedb = todos.map(el => {
        return {
            id: el.id,
            name: el.name,
            image: el.image,
            defense: el.defense,
            hp: el.hp,
            height: el.height,
            weight: el.weight,
            speed: el.speed,
            attack: el.attack,
            TypePrimary: el.types[0]?.name,
            TypeSecond: el.types[1]?.name,
            createdInDb: el.createdInDb
        }
    })
    return pokedb
}

const getAllPokemons = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
}

module.exports = {
    getApiInfo, getAllPokemons, getDbInfo
}
