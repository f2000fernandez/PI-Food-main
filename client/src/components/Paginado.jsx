import React, { useEffect } from "react";
// import './estilos/Paginado.css';

const Paginado = ({recipesPerPage, recipes, setCurrentPage}) => {
    
    const pages = [];
    for (let i=1; i <= Math.ceil(recipes / recipesPerPage); i++) {
        pages.push(i);
    }

    return (
        <div>
            {
                pages.length > 0 && pages.map(num => (    
                    <button key={num} className="container" onClick={()=>setCurrentPage(num)}>
                        {num}
                    </button>
                ))
            }
        </div>
    )
}


export default Paginado;