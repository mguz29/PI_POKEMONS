import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { postPokemon, getTypes } from "../actions";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import style from '../Styles/PokemonCreate.module.css'


export default function PokemonCreate() {
    const dispatch = useDispatch()
    const Types = useSelector((state) => state.types)
    const history = useHistory()
    const pokemonsAll = useSelector((state) => state.pokemons).map(e => e.name);

    const [input, setInput] = useState({
        name: "",
        height: 0,
        weight: 0,
        hp: 1,
        attack: 1,
        defense: 1,
        speed: 1,
        image: "",
        TypePrimary: "",
        TypeSecond: null,

    })

    const [errors, setErrors] = useState({});
    // creamos un estado local de mensajes
    const [msg, setMsg] = useState("");


    const validate = (input) => {
        let errors = {};

        if (pokemonsAll.includes(input.name.toLowerCase())) {
            errors.name = "The pokemon already exists, use another name";
        }

        if (!input.name) {
            errors.name = "A name is required";
        } else if (!/^[a-zA-Z]+$/.test(input.name) || input.name.length > 10) {
            errors.name = "Name is invalid";
        }

        if (!input.height) {
            errors.height = "Height is required";
        } else if (input.height > 200) {
            errors.height = "Height is invalid";
        }

        if (!input.weight) {
            errors.weight = "Weight is required";
        } else if (input.weight > 10000) {
            errors.weight = "Weight is invalid";
        }

        if (!input.image) {
            errors.image = "an image url is required";
        } else if (!/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/.test(input.image)
        ) { errors.image = "url is invalid"; }

        return errors;
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function handleChange(e) {
        setMsg("");
        if (e.target.name === "name" || e.target.name === "image" || e.target.name === "TypePrimary" || e.target.name === "TypeSecondary") {
            setInput({
                ...input,
                [e.target.name]: e.target.value,
            });

        } else {


            setInput({
                ...input,
                [e.target.name]: Number(e.target.value),
            });
        }

        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    };




     async function  handleSubmit(e) {
        e.preventDefault();
        if (Object.keys(errors).length===0 && input.name)
        dispatch(postPokemon(input))
        alert('Personaje Creado')
        setInput({
            name: "",
            height: 0,
            weight:0,
            hp: 1,
            attack: 1,
            defense: 1,
            speed: 1,
            image: "",
            TypePrimary: "",
            TypeSecond: null,
        })

        history.push('/home')
        console.log(input)
    }

    function handleSelect(e) {
        setInput({
            ...input,
            TypePrimary: e.target.value

        })

    }
    function handleSelect2(e) {
        setInput({
            ...input,
            TypeSecond: e.target.value

        })

    }


    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])

    return (
        <div className={style.container}>
            <nav className={style.nav}> 
                <Link to='/home'>
                     <button className={style.navBo}> Volver</button>
                 </Link>
            </nav>
           
        <div className={style.formulario}>
            <h1>Crea tu Pokemon</h1>

            <form onSubmit={e => handleSubmit(e)}>

                <div className={style.name}>
                    <label>Name:</label>
                    <input
                    className={style.inputname}
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={e => handleChange(e)}
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div className={style.alturapeso}>
                    <div className={style.height}>
                        <label>Heigth:</label>
                        <input
                        className={style.inputheight}
                            type="text"
                            value={input.height}
                            name="height"
                            onChange={e => handleChange(e)}
                        />
                        {errors.height && <p className="error">{errors.height}</p>}
                    </div>


                    <div className={style.weight}>
                        <label>Weight:</label>
                        <input
                         className={style.inputweight}
                            type="text"
                            value={input.weight}
                            name="weight"
                            onChange={e => handleChange(e)}
                        />
                        {errors.weight && <p className="error">{errors.weight}</p>}

                    </div>
                </div>

                <div className={style.hpspeed}>
                <div className={style.hp}>
                    <label>Hp:</label>
                    <input
                        type="range"
                        value={input.hp}
                        name="hp"
                        min={1}
                        max={255}
                        onChange={e => handleChange(e)}
                    />
                    {input.hp}
                </div>

                <div className={style.speed}>
                    <label>Speed:</label>
                    <input
                        type="range"
                        value={input.speed}
                        name="speed"
                        min={5}
                        max={200}
                        onChange={e => handleChange(e)}
                    />
                    {input.speed}
                </div>
                </div>

                <div className={style.defenseatack}>
                <div className={style.defense}>
                    <label>Defense:</label>
                    <input className="inputdefensa"
                        type="range"
                        value={input.defense}
                        name="defense"
                        min={5}
                        max={230}
                        onChange={e => handleChange(e)}
                    />
                    {input.defense}
                </div>

                <div className={style.attack}>
                    <label>Attack:</label>
                    <input
                        type="range"
                        value={input.attack}
                        name="attack"
                        min={5}
                        max={210}
                        onChange={e => handleChange(e)}
                    />
                    {input.attack}
                </div>
                </div>

            <div className={style.types}>
                <div className={style.typeprimary}>
                    <label>TypePrimary: </label>
                    <select  className={style.inputTypePrimary} onChange={e => handleSelect(e)}>

                        {Types.map((typ) => (
                            <option value={typ.name}>{typ.name}</option>
                        ))}
                    </select>
                </div>



                <div className={style.typesecond}>
                    <label>TypeSecond: </label>
                    <select className={style.inputTypePrimary} onChange={e => handleSelect2(e)}>

                        {Types.map((typ) => (
                            <option value={typ.name}>{typ.name}</option>
                        ))}
                    </select>
                </div>
                </div>

                <div className={style.imagessss}>
                    <label>Image:</label>
                    <input
                    className={style.inputTypePrimary}
                        type="text"
                        value={input.image}
                        name="image"
                        onChange={e => handleChange(e)}
                    />
                    {errors.image && <p className="error">{errors.image}</p>}
                </div>

                {/* <ul><li> {input.types.map(el=>el+" ,")} </li></ul> */}

                <button className={style.iboton} type="submit" disabled={
            !input.name || errors.name || errors.height || errors.weight || errors.image
              ? true
              : false
          }>Crear Pokemon</button>
          {msg.length > 0 && (
          <div className="mensaje">
            <p>{msg}</p>
            <Link to="/home">Go back to Home</Link>
          </div>
        )}

            </form>
        </div>

        </div>
    )
}

