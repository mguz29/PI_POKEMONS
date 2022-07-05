import axios from 'axios'

export function getPokemons(){
    return async function(dispatch){
        
        var json = await axios.get('http://localhost:3001/pokemons')
        return dispatch({
            type:'GET_POKEMONS',
            payload: json.data
        })
    }

}

export function getDeatil(id){
    return async function(dispatch){
   
            const json = await axios.get('http://localhost:3001/pokemons/'+ id)
            console.log(json)
        return dispatch({
            type:'GET_DETAILS',
            payload: json.data
        })
     
    }
}

export function SetPokemonDetail() {
    return{
        type:'SET_DETAIL_POKEMON',
        payload:{}
    }
    
} 


export function filterCreated(payload) {
    return {
        type:'FILTER_CREATED',
        payload
    }
    
}


export function orderByName(payload){
    return{
        type:'ORDER_BY_NAME',
        payload
    }
}

export function orderByAttack(payload) {
    return {
        type:'ORDER_BY_ATTACK',
        payload
    }
    
}

export function getNamePokemons(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/pokemonss?name=" + name)
            return dispatch({
                type:"GET_NAME_POKEMONS",
                payload:json.data
            })
        } catch (error) {
            console.log(error)
            
        } 
    }
}

export function getTypes() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/types',{

        })
        return dispatch({
            type:"GET_TYPES",
            payload:json.data
        })
    }
    
}

export function filterType(payload){
    return{
        type:'FILTER_TYPE',
        payload
    }
    
}

export function filterType2(payload){
    return{
        type:'FILTER_TYPE2',
        payload
    }
}

export function postPokemon(payload) {
    return async function (dispatch) {
        const response = (await (axios.post('http://localhost:3001/pokemon',payload)))
        console.log(response)
        return response
    }
    
}