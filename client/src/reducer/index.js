const initialState = {
    types: [],
    pokemons: [],
    allPokemons: [],
    detail: []

}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
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


        // case 'FILTER_TYPE':
        //      const status = state.allPokemons
        //     const typeFilter = status.filter(t=> t.types === action.payload)

        //     return {
        //         ...state,
        //         pokemons:typeFilter
        //     }   

        //   case 'FILTER_TYPE':
        //      const status = state.allPokemons
        //     const typeFilter = status.filter(t=> t.types[0].name ?  t.types[0].name === action.payload : t.types === action.payload)

        //     return {
        //         ...state,
        //         pokemons:typeFilter
        //     }   

        case 'FILTER_TYPE':
            const status = state.allPokemons
            const typeFilter = status.filter(t => t.TypePrimary === action.payload)
           

            return {
                ...state,
                pokemons: action.payload === 'All' ? state.allPokemons :  typeFilter
            }

        case 'FILTER_TYPE2':
            const staatus = state.allPokemons
            const typeFilter2 = staatus.filter(t => t.TypeSecond === action.payload)
            return {
                ...state,
                pokemons: action.payload === 'All' ? state.allPokemons :  typeFilter2,
                
                
            }
           
        


        case 'FILTER_CREATED':

            const createdFilter = action.payload === 'Creado' ? state.allPokemons.filter(el => el.createdInDb) : state.allPokemons.filter(el => !el.createdInDb)
            return {
                ...state,
                pokemons: action.payload === 'All' ? state.allPokemons : createdFilter

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
