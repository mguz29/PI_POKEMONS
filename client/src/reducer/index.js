const initialState = {
    loading: true,
    types: [],
    pokemons: [],
    allPokemons: [],
    detail: [],
    typefilter: []

}

function rootReducer(state = initialState, action) {
    switch (action.type) {


        case "CHANGE_LOADING":
            return {
                pokemons: [],
                loading: true,
                allPokemons: [],
            };

        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
                loading: false,
            }


        case 'GET_DETAILS':
            return {
                ...state,
                detail: action.payload
            }



        case 'GET_NAME_POKEMONS':
            return {
                ...state,
                pokemons: action.payload
            }


        case 'POST_POKEMON':
            return {
                ...state
            }


        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload

            }

        case 'FILTER_TYPE':
            const status = state.allPokemons
            const typeFilter = status.filter(t => t.TypePrimary === action.payload)


            return {
                loading: false,
                ...state,
                pokemons: action.payload === 'All' ? state.allPokemons : typeFilter.length ? typeFilter : [{ no: 'no' }]
            }

        case 'SET_DETAIL_POKEMON':
            return {
                ...state,
                detail: action.payload
            }


        case 'FILTER_TYPE2':
            const staatus = state.allPokemons
            const typeFilter2 = staatus.filter(t => t.TypeSecond === action.payload)
            return {
                ...state,
                loading: false,
                pokemons: action.payload === 'All' ? state.allPokemons : typeFilter2.length ? typeFilter2 : [{ no: 'no' }]


            }




        case 'FILTER_CREATED':
            const estados = state.allPokemons
            const createdFilter = action.payload === 'Creado' ? estados.filter(el => el.createdInDb) : state.allPokemons.filter(el => !el.createdInDb)

            return {
                ...state,
                loading: false,
                pokemons: action.payload === 'All' ? state.allPokemons : createdFilter.length ? createdFilter : [{ no: 'no' }]

            }

        case 'ORDER_BY_NAME':
            let sortedArr = action.payload === 'asc' ?
                state.pokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1
                    }
                    if (b.name > a.name) {
                        return -1
                    }
                    return 0

                }) :
                state.pokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1
                    }
                    if (b.name > a.name) {
                        return 1
                    }
                    return 0

                })
            return {
                ...state,
                pokemons: sortedArr
            }


        case 'ORDER_BY_ATTACK':

            let SortedArr = action.payload === 'Attack -' ?
                state.pokemons.sort(function (a, b) {
                    if (a.attack > b.attack) {
                        return 1
                    }
                    if (b.attack > a.attack) {
                        return -1
                    }
                    return 0

                }) :
                state.pokemons.sort(function (a, b) {
                    if (a.attack > b.attack) {
                        return -1
                    }
                    if (b.attack > a.attack) {
                        return 1
                    }
                    return 0

                })
            return {
                ...state,
                pokemons: SortedArr

            }




        default:
            return state

    }

}
export default rootReducer
