const axios = require('axios')
const {Type} = require('../db')


const getTypes = async (req, res, next) => {
    const respuesta = await axios('https://pokeapi.co/api/v2/type')
    const type = respuesta.data.results.map(el=>{
        return { name: el.name}
   })
   const tiposFinal = type.map((e) => e.name);
   tiposFinal.forEach(e => {
       Type.findOrCreate({
               where: {name: e}
       })
   });
   const allType = await Type.findAll();
   
}

const GetTypes = async (req, res, next) => {
    const respuesta = await axios('https://pokeapi.co/api/v2/type')
    const type = respuesta.data.results.map(el=>{
        return { name: el.name}
   })
   const tiposFinal = type.map((e) => e.name);
   tiposFinal.forEach(e => {
       Type.findOrCreate({
               where: {name: e}
       })
   });
   const allType = await Type.findAll();
   res.send(allType)
    
   
}


module.exports = { getTypes,GetTypes }