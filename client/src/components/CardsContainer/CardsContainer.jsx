import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getDogs,
  getDogTemperaments,
  alphabeticalOrder,
  temperamentsFilter,
  dogsCreatedFilter
  
} from "../../Redux/action";
import Paginate from "../Paginate/Paginate";

//este componente debe tomar un array de dogs y por cada dog
//renderizar un componente card

//componente smart
const CardsContainer = () => {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.allDogs);
  const temperaments = useSelector((state) => state.temperaments);

  //paginacion
  const [page, setPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const indexOfLastDog = page * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);
  const [order, setOrder] = useState([]);

  const pagination = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getDogTemperaments());
  }, [dispatch]);

  //filtrar por temperamentos
  const handlerFilterByTemp = (event) => {
    event.preventDefault()
    dispatch(temperamentsFilter(event.target.value))
  }

  //filtrar por API o DB
  const handlerFilterBySource = (event) => {
    dispatch(dogsCreatedFilter(event.target.value))

  }

  //ordenar alfabeticamente
  const handlerSortAlpha = (event) => {
    event.preventDefault();
    dispatch(alphabeticalOrder(event.target.value));
    setPage(1);
    setOrder(`order${event.target.value}`);
  };



  return (
    <div>
      <div>
        <div>
          <h6>Find dogs by temperament</h6>
          <select onChange={handlerFilterByTemp}>
                <option value="All">All the temperaments</option>
            {temperaments?.map((temp) => (
              <option value={temp.name} key={temp.id} >{temp.name}</option>
            ))}
          </select>
        </div>

        <div>
          <h6>Find dogs from API or DB</h6>
          <select onChange={handlerFilterBySource}>
            <option value="All">All sources</option>
            <option value="createdInDB">DB</option>
            <option value="created">API</option>
          </select>
        </div>

        <div>
          <h6>Order the dogs alphabetically</h6>
          <select onChange={(event) => handlerSortAlpha(event)}>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
          </select>
        </div>

        <div>
          <h6>Order the dogs by weight</h6>
          <select></select>
        </div>
      </div>

      <div className={style.container}>
        {currentDogs.map((dog) => {
          return (
            <Card
              key={dog.id}
              image={dog.image}
              name={dog.name}
              temperament={dog.temperament}
              weight={dog.weight}
              id={dog.id}
            />
          );
        })}
      </div>

      <div>
        <Paginate
          dogsPerPage={dogsPerPage}
          dogs={dogs.length}
          pagination={pagination}
          currentPage={currentDogs}
        />
      </div>
    </div>
  );
};

export default CardsContainer;
