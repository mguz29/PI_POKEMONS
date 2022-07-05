import React from "react";
import { Link } from "react-router-dom";
import '../Styles/Card.css'


export default function Card({ name, image, attack, TypePrimary, TypeSecond, id }) {
    return (

        <div >
            <Link to={`/pokemons/${id}`}>
                <div className="divimagen"><img className="imagen" src={image} alt="img not found" width="200px" height="130px"></img> </div>
            </Link>
            <div className="divnombre"><h2 className="name">{name}</h2></div>
            <p className="Types">{TypePrimary} {TypeSecond}  </p>
            <p className="atack">Attack: {attack}</p>



        </div>
    );

}