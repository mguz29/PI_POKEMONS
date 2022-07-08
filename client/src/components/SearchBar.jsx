import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { getNamePokemons } from "../actions";
import style from "../Styles/SearchBar.module.css"

export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch()
  const [name, setName] = useState()
  const [msg, setMsg] = useState("");

  function handleInputChange(e) {
    e.preventDefault()
    setName(e.target.value)
    console.log(name)

  }

  function handleSubmit(e) {
    e.preventDefault()
    if (name) {
      dispatch(getNamePokemons(name))
      setName('')
      setMsg('')
      setCurrentPage(1)
    }
    else {
      setMsg("Please write a name");
      alert("Please write a name")
    }
  }

  return (
    <div className={style.Container}>
      <input
        className={style.input}
        value={name}
        type='text'
        placeholder="Buscar..."
        onChange={(e) => handleInputChange(e)} />
      <button className={style.button} type="submit" onClick={(e) => handleSubmit(e)} ></button>
      {msg.length > 0 && (
        <div className="mensaje">
          <p>{msg}</p>
        </div>
      )}
    </div>
  )
}