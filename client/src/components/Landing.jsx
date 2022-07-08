import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Landing.css"
import image from '../images/fondola.png'


function Landing() {
    return (
        <div className="container-Landing">
            <Link to={'/Home'}>
                <img src={image} alt='image not found' className="botoningresar"></img>
            </Link>
            <h1 className="h1">Bienvenidos</h1>
        </div>
    )
}
export default Landing