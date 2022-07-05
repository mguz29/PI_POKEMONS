const axios = require('axios')
const { Pokemon, Type } = require('../db')
const { getAllPokemons, getDbInfo } = require('./controllerGeneral')
const { Op } = require("sequelize");


//funcion para traer todo los pokemons y buscar pokemon por query name
const getPokemons = async (req, res, next) => {
    const { name } = req.query
    try {
        let pokemonTotal = await getAllPokemons();
        if (name) {
            let pokemonName = pokemonTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
            pokemonName.length ?
                res.status(200).send(pokemonName) :
                res.status(404).send('pokemon not found')
        } else {
            res.status(200).send(pokemonTotal)
        }
    } catch (error) {
        next(error)
    }
}



// const getNamePokemons = async (req,res,next)=>{
//          const {name} = req.query
//         try {
//             let pokemonTotal = await getAllPokemons();

//             if(name){

//                 const db = await Pokemon.findOne({
//                 where:{name:name},
//                  include:Type })

//                 if (db) {
//                         const pokemonDb = [
//                             {
//                             id: db.id,
//                             name: db.name,
//                             heigth:db.heigth,
//                             weigth:db.weigth, 
//                             hp:db.hp, 
//                             attack:db.attack, 
//                             defense:db.defense, 
//                             speed:db.speed,
//                             },
//                         ];
//                         res.status(200).send(pokemonDb)

//                     }else{
//                         const response = (await (axios(`https://pokeapi.co/api/v2/pokemon/${name}`))).data
//                         const pokemon = [{
//                             id:response.id,
//                             name:response.name,
//                             heigth:response.heigth,
//                             weigth:response.weigth, 
//                             hp:response.stats[0].base_stat, 
//                             attack:response.stats[1].base_stat, 
//                             defense:response.stats[2].base_stat, 
//                             speed:response.stats[5].base_stat,
//                             TypePrimary:response.types[0].type.name,
//                             TypeSecond:response.types[1]?.type.name,
//                             image:response.sprites.other.dream_world.front_default
//                         }]
//                         if (pokemon) {
//                             res.status(200).send(pokemon)
//                         }else{
//                             res.status(404).send('pokemon not found')
//                         }

//                     }

//             }else{
//                 res.status(200).send(pokemonTotal)

//             }




//         } catch (error) {
//             next(error)
//         }
//     }

//funcion para buscar pokemon por nombre
const getPokeName = async (req, res, next) => {
    const { name } = req.query
    try {
        const db = await Pokemon.findOne({
            where: { name: name },
            include: Type
        })
        if (db) {
            const pokemonDb = [
                {
                    id: db.id,
                    name: db.name,
                    heigth: db.heigth,
                    weigth: db.weigth,
                    hp: db.hp,
                    attack: db.attack,
                    defense: db.defense,
                    speed: db.speed,
                },
            ];
            res.status(200).send(pokemonDb)

        } else {
            const response = (await (axios(`https://pokeapi.co/api/v2/pokemon/${name}`))).data
            const pokemon = [{
                id: response.id,
                name: response.name,
                heigth: response.weight,
                weigth: response.weight,
                hp: response.stats[0].base_stat,
                attack: response.stats[1].base_stat,
                defense: response.stats[2].base_stat,
                speed: response.stats[5].base_stat,
                TypePrimary: response.types[0].type.name,
                TypeSecond: response.types[1]?.type.name,
                image: response.sprites.other.dream_world.front_default
            }]
            if (pokemon) {
                res.status(200).send(pokemon)
            } else {
                res.status(404).send('pokemon not found')
            }

        }
    } catch (error) {
        next(error)
    }
}


//funcion para buscar pokemons por Id
const pokemonIDd = async (id) => {
        if (id) {
            const response = (await (axios(`https://pokeapi.co/api/v2/pokemon/${id}`))).data
            const pokemon = [{
                id: response.id,
                name: response.name,
                heigth: response.weight,
                weigth: response.weight,
                hp: response.stats[0].base_stat,
                attack: response.stats[1].base_stat,
                defense: response.stats[2].base_stat,
                speed: response.stats[5].base_stat,
                TypePrimary: response.types[0].type.name,
                TypeSecond: response.types[1]?.type.name,
                image: response.sprites.other.dream_world.front_default
            }]
            return pokemon
        }
}

const pokemonID = async (req, res, next) => {
    const { id } = req.params
    let pokedb;
    let pokemonDb;
    try {
        if(id){
        if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)){
            pokedb = await Pokemon.findOne({where:{id:id},
                include: {
                    model: Type,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    },
                }
            })
                 pokemonDb = [{
                    id: pokedb.id,
                    name: pokedb.name,
                    height: pokedb.height,
                    weight: pokedb.weight,
                    hp: pokedb.hp,
                    attack: pokedb.attack,
                    defense: pokedb.defense,
                    speed: pokedb.speed,
                    image:pokedb.image,
                    TypePrimary: pokedb.types[0].name,
                    TypeSecond: pokedb.types[1]?.name,
                }];
            console.log(pokemonDb, 'pokemon creado')
        }
        if(!pokedb){
            let pokeApi = await pokemonIDd(id)
        
            return res.send(pokeApi)
        }
        return res.send(pokemonDb)
    }
       
    } catch (error) {
        console.log(error)
        
    }
     
}



// const pokemonID = async (req, res, next) => {
//     const { id } = req.params
//     try {
//         const pokemonsId = await Pokemon.findByPk(id)
//         if (pokemonsId) {

//             const pokemonDb = [
//                 {
//                     id: db.id,
//                     name: db.name,
//                     heigth: db.heigth,
//                     weigth: db.weigth,
//                     hp: db.hp,
//                     attack: db.attack,
//                     defense: db.defense,
//                     speed: db.speed,
//                 },
//             ];
//             res.status(200).send(pokemonDb)
       

//             } else {
//                 const response = (await (axios(`https://pokeapi.co/api/v2/pokemon/${id}`))).data
//                 const pokemon = [{
//                     id: response.id,
//                     name: response.name,
//                     heigth: response.weight,
//                     weigth: response.weight,
//                     hp: response.stats[0].base_stat,
//                     attack: response.stats[1].base_stat,
//                     defense: response.stats[2].base_stat,
//                     speed: response.stats[5].base_stat,
//                     TypePrimary:response.data.types[0].type.name,
//                     TypeSecond:response.data.TypePrimary[1]?.type.name,
//                     image: response.sprites.other.dream_world.front_default
//                 }]
//                 if (pokemon) {
//                     console.log(pokemon)
//                     res.status(200).send(pokemon)
//                 } else {
//                     res.status(404).send('pokemon not found')
//                 }
            
//         }
//     } catch (error) {
//         next(error)
//     }

// }



// funcion para crear un pokemon
const PokemonPost = async (req, res, next) => {
    const { name, height, weight, hp, attack, defense, speed, TypePrimary, TypeSecond, image } = req.body
    try {

        if (!name) { throw new Error('Need to send the name of the pokemon!') }; //*crea un error si no existe el name del pokemon
        
        if (!image) {
            errors.image = "an image url is required";
        } else if (!/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/.test(image)
        ) {  throw new Error('Need to send the image of the pokemon!') }

        //* buscamos en el DB si existe un pokemon con ese nombre
        const pokemonDB = await Pokemon.findOne({ where: { name: name.toLowerCase() } });
        console.log(pokemonDB)
        
        if (pokemonDB) //* Crea un error si existe  un pokemon con ese nombre en el DB
        { 
             window.alert('Ese Personaje ya existe')
        throw new Error('There is already a pokemon with that name, please choose another name!')  };
        
        const typeDb = await Type.findAll({
            where: { name: { [Op.in]: [TypePrimary, TypeSecond] } }
        })


        const pokemonNew = await Pokemon.create({
            name,
            height,
            weight,
            hp,
            attack,
            defense,
            speed,
            image
        })

        // let typeDb = await Type.findAll({
        //     where: { name : TypePrimary}
        // })
        pokemonNew.addType(typeDb) // metodo de SQL que lo que hace es traerme de la tabla lo que le pido por parametro
        res.status(200).send('pokemon creado correctamente')

    } catch (error) {
        next(error)

    }

}



module.exports = { getPokemons, pokemonID, PokemonPost, getPokeName }