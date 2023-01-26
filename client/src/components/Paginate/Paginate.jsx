import React from "react";
import styles from "./Paginate.module.css"



const Paginate = ({dogsPerPage, dogs, pagination, currentPage}) => {
    
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(dogs/dogsPerPage); i++ ) {
        pageNumbers.push(i)
    }


    return(
        <nav>
            <ul className={styles.crumbs}>
                {
                    pageNumbers && pageNumbers.map(number => (
                        <li className={styles.number} key={number}>
                            <div className={currentPage === number ? styles.crumb__active : styles.crumb} 
                            onClick={() => pagination(number)}> {number} </div>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Paginate;
