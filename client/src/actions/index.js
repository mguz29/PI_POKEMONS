import axios from 'axios'

export function getPokemons() {

    return async function (dispatch) {

        var json = await axios.get('/pokemons')
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        })
    }

}

export function getDeatil(id) {
    return async function (dispatch) {
        try {
            const json = await axios.get('/pokemons/' + id)
            console.log(json)
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            if (error.response) {
                alert(error.response.data)
                window.location.href = 'http://localhost:3000/Home'
            }
        }

    }
}



export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }

}


export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByAttack(payload) {
    return {
        type: 'ORDER_BY_ATTACK',
        payload
    }

}

export function getNamePokemons(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get("/pokemonss?name=" + name)
            return dispatch({
                type: "GET_NAME_POKEMONS",
                payload: json.data
            })
        } catch (error) {
            if (error.response) alert(error.response.data)

        }
    }
}

export function getTypes() {
    return async function (dispatch) {
        var json = await axios.get('/types', {

        })
        return dispatch({
            type: "GET_TYPES",
            payload: json.data
        })
    }

}

export function filterType(payload) {
    return {
        type: 'FILTER_TYPE',
        payload
    }

}

export function filterType2(payload) {

    return {
        type: 'FILTER_TYPE2',
        payload
    }
}

export function postPokemon(payload) {
    return async function (dispatch) {
        try {
            const response = (await (axios.post('/pokemon', payload)))
            return response
        } catch (error) {
            if (error.response) alert(error.response.data)
        }
    }


}