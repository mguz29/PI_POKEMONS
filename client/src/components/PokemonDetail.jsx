import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDeatil } from '../actions/index'
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import '../Styles/PokemonDetail.css'
import image from "../images/pokemon.png"
import Loading from './Loading'



export default function Detail() {

  const { id } = useParams();
  console.log(id)
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.detail);
  console.log(pokemon)

  useEffect(() => {
    dispatch(getDeatil(id));
    
  }, [dispatch,id])


  return (
    <div className='renderizado'>

      <nav className='nav'>
        < Link to='/Home'>
          <button  className='Button'>Volver</button>
        </Link>
        <Link to='/Home'>
          <img src={image} className="images" />
        </Link>

        <img className='imagess' src={pokemon.length ? pokemon[0].image : 'Cargando'} />
      </nav>

      {
        pokemon.length > 0 ?
          <div className='Tarjeta'>
            <div className='informacios'>
              <div className='image'> <img src={pokemon[0].image ? pokemon[0].image : 'Cargando'} lt="img not found" width="500px" height="400px" /></div>
              <div className='texto'>
                <h2 className='Tarjetita'>ID: {pokemon[0].id}</h2>
                <h2 className='Tarjetita'>Name: {pokemon[0].name}</h2>
                <h2 className='Tarjetita'>Heigth: {pokemon[0].height}</h2>
                <h2 className='Tarjetita'>Weigth: {pokemon[0].weight}</h2>
                <h2 className='Tarjetita'>Hp: {pokemon[0].hp}</h2>
                <h2 className='Tarjetita'>Attack: {pokemon[0].attack}</h2>
                <h2 className='Tarjetita'>Defense: {pokemon[0].defense}</h2>
                <h2 className='Tarjetita'>Speed: {pokemon[0].speed}</h2>
                <h2 className='Tarjetita'>Types: {pokemon[0].TypePrimary} {pokemon[0].TypeSecond}</h2>
                {/* <h2 className='Tarjetita'>types:{ pokemon[0].types[0].name ?  pokemon[0].types[0].name: pokemon[0].types }</h2> */}
                {/* <h2 className='Tarjetita'>TypeSecond: { pokemon[0].TypeSecond ?  pokemon[0].TypeSecond: ''  }</h2> */}
              </div>
            </div>
          </div> : <Loading setLoading={setLoading} />

      }




    </div>
  )
}