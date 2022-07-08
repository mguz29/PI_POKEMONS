import Card from "./Card";
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getTypes, filterCreated, orderByName, filterType, orderByAttack, filterType2 } from "../actions/index";
import Paginado from "./Paginado";
import '../Styles/home.css'
import SearchBar from "./SearchBar";
import Loading from "./Loading";
import Errores from "./Errores";


export default function Home() {

    const dispatch = useDispatch()
    const AllPokemons = useSelector((state) => state.pokemons)
    console.log(AllPokemons)

    const Types = useSelector((state) => state.types)
  
    const [attack, setAttack] = useState('')
    const [order, setOrden] = useState('')

    const [currentPage, setCurrentPage] = useState(1) // estado local, inicia siempre en la pagina uno
    const [pokemonsPerPage] = useState(12) // estado local, me piden 15 pokemons por pagina
    const indexOfLastPokemon = currentPage * pokemonsPerPage // indice del ultimo pokemon: pagina actual * cantidad de pokemonss por pagina / 15
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage // indice del primer pokemon: indice del ultimo - cantidad de pokemons por pagina / 0
    const currentPokemons = AllPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)
    const [loading, setLoading] = useState(true);



    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getPokemons())
    }, [dispatch])

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])

    function handleSort(e) {
        e.preventDefault();
        if (e.target.value !== 'All') {
             dispatch(orderByName(e.target.value))
            console.log(e.target.value)
            setCurrentPage(1);
            setOrden(`Ordenado ${e.target.value}`)
        }else{
            dispatch(getPokemons())
            setCurrentPage(1)
            setOrden(e.target.value)
        }
       
    }

    function handleSortAttack(e) {
        e.preventDefault();
        if (e.target.value !== 'All') {
        dispatch(orderByAttack(e.target.value))
        setCurrentPage(1);
        setAttack(`Ordenado ${e.target.value}`)
    }else{
        dispatch(getPokemons())
        setCurrentPage(1)
        setOrden(e.target.value)
    }
        
    }

    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value))
    }

    function handleFilterType(e) {
        dispatch(filterType(e.target.value))
        setCurrentPage(1);
    }

    function handleFilterType2(e) {
        dispatch(filterType2(e.target.value))
        setCurrentPage(1);
    }

    return (
        <div className="home-container">
            <div>

                <div className="filtrosNav" >

                    <div className="creaPokemon"><Link to='/Pokemon' className="creapokemon">Crear Pokemon</Link></div>
                    {/* <button className="refresh" onClick={(e) => handleClick(e)}>Refresh</button> */}

                    <select className="ordenNombre" onChange={e => handleSort(e)} >
                        <option hidden>Ordenar por Nombre</option>
                        <option value='All'>All</option>
                        <option value='asc'>A-Z</option>
                        <option value='desc'>Z-A</option>
                    </select>

                    <select className="ordenPeso" onChange={e => handleFilterCreated(e)}>
                        <option value='All'>All</option>
                        <option value='Creado'>Creado</option>
                        <option value='Existente'>Existente</option>
                    </select>

                    <select className="ordenPeso" onChange={e => handleFilterType(e)}>
                        <option hidden>Ordenar por Primer Tipo</option>
                        <option value="All">All</option>
                        {Types.map((typ) => (
                            <option key={typ.name} value={typ.name} >{typ.name}</option>
                        ))}
                    </select>

                    <select className="ordenPeso" onChange={e => handleFilterType2(e)}>
                        <option hidden>Ordenar por Segudo Tipo</option>
                        <option value="All">All</option>
                        {Types.map((typ) => (
                            <option key={typ.id} value={typ.name} >{typ.name}</option>
                        ))}
                    </select>

                    <select className="ordenPeso" onChange={e => handleSortAttack(e)} >
                        <option hidden>Ordenar por Ataque</option>
                        <option value='All'>All</option>
                        <option value='Attack +'>Attack +</option>
                        <option value='Attack -'>Attack -</option>
                    </select>
                    <SearchBar
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <div className="Cards">
                    <div className="Cardshijo">
                        {
                            //AllPokemons[0] !== 'no' ?
                            // AllPokemons.length !== 0 ?
                            // AllPokemons[0] !== 'no' ? 
                             AllPokemons.length !== 0 ? AllPokemons[0]?.no ? <Errores></Errores> :
                                currentPokemons?.map((el) => {
                                    console.log(currentPokemons)
                                    return (
                                        <div className="card">
                                            <div className="cardhijo">
                                                <Card
                                                    key={el.id}
                                                    id={el.id}
                                                    attack={el.attack}
                                                    name={el.name}
                                                    image={el.image}
                                                    TypePrimary={el.TypePrimary}
                                                    TypeSecond={el.TypeSecond}
                                                />
                                            </div>
                                        </div>
                                    )
                                })//: <Loading setLoading={setLoading} /> 
                               : <Loading setLoading={setLoading} /> 
                        //   : AllPokemons[0]?.no ?  'No se econtro nada'
                        }
                          
                    </div>
                </div>

                <div>
                    <nav className="paginado"><Paginado
                        pokemonsPerPage={pokemonsPerPage}
                        AllPokemons={AllPokemons.length}
                        paginado={paginado} />
                    </nav>
                </div>

            </div>
        </div>
    )
}