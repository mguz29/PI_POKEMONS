import React from "react";
import '../Styles/Paginado.css'


export default function Paginado({ pokemonsPerPage, AllPokemons, paginado }) { // declaro mi paginado y me traigo propiedades del componente Home
    const pageNumbers = [] // declaro un arreglo vacio
    for (let i = 1; i < 5; i++) {  //cantidad de paginas que tendra mi home - recorro un arreglo en el que tomo el numero entero que obtengo por resultado de dividir todos los personajes * los personajes por pagina
        pageNumbers.push(i) // i+1 para que arranque en 1 y no en cero - pusheo ese numero entero en el arreglo vacio
    }
    return (
        <nav>
            <ul className="paginado">
                {pageNumbers && pageNumbers.map(number => ( //  renderizo. si tengo este arreglo, entonces mapealo y devolve por ese arreglo, cada uno de los numeros que me devuelve el paginado
                    <li className="li_paginado" key={number} >
                        <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}