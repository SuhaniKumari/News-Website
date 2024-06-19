import React from 'react'
import style from './Pagination.module.css'
import { useLocation, useNavigate } from 'react-router-dom'

const Pagination = ({ pageData }) => {

    const location = useLocation();
    const navigate = useNavigate();

    const handleSearch = (page) => {

        if(location.pathname === '/search/'){
            navigate(`/search/${location.search}&page=${page}`)
        }else{
            navigate(`?page=${page}`);
        }
    }

    const { currentPage, totalPages } = pageData;

    return (
        <div className={style.Pagination}>
            {
                currentPage > 1 && <button onClick={()=>handleSearch(currentPage-1)}>Prev</button>
            }
            {currentPage > 2 && <h2 onClick={()=>handleSearch(currentPage-2)}>{currentPage - 2}</h2>}
            {currentPage > 1 && <h2 onClick={()=>handleSearch(currentPage-1)}>{currentPage - 1}</h2>}
            <p>{currentPage}</p>
            {currentPage < totalPages && <h2 onClick={()=>handleSearch(currentPage+1)}>{currentPage + 1}</h2>}
            {currentPage < totalPages - 1 && <h2 onClick={()=>handleSearch(currentPage+2)}>{currentPage + 2}</h2>}
            {
                currentPage < totalPages && <button onClick={()=>handleSearch(currentPage+1)}>Next</button>
            }
        </div>
    )
}

export default Pagination