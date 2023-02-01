import React from "react";
import styles from "./Paginate.module.css";

const Paginate = ({ dogsPerPage, dogs, pagination, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(dogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  function handlerArrows(event){
    event.target.value === "prev" && currentPage !== 1 && pagination(currentPage - 1)
    event.target.value === "next" && currentPage !== Math.ceil((dogs / dogsPerPage)) && pagination(currentPage + 1)
}

  return (
    <nav>
      <ul className={styles.crumbs}>
        <button
          className={styles.arrow}
          onClick={handlerArrows}
          disabled={currentPage === 1}
          value="prev"
        >
          &larr;
        </button>

        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className={styles.number} key={number}>
              <div
                className={
                  currentPage === number ? styles.crumb__active : styles.crumb
                }
                onClick={() => pagination(number)}
              >
                {" "}
                {number}{" "}
              </div>
            </li>
          ))}

        <button
          className={styles.arrow}
          onClick={handlerArrows}
          disabled={currentPage === pageNumbers.length}
          value= "next"
        >
          &rarr;
        </button>
      </ul>
    </nav>
  );
};

export default Paginate;
