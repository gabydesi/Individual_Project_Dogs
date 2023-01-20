import React from "react"
import Card from "../Card/Card"
import style from "./CardsContainer.module.css"
import {useSelector} from 'react-redux'


//este componente debe tomar un array de dogs y por cada dog
//renderizar un componente card

//componente smart
const CardsContainer = () => {
    

    const dogs = useSelector(state=>state.dogs)
    
    return(
        <div className={style.container}> 
            {dogs.map(dog=>{
                return <Card
                    key={dog.id}
                    image={dog.image}
                    name={dog.name}
                    temperament={dog.temperament}
                    weight={dog.weight}
                    id={dog.id}
                />
            })}
        </div>
    )
}





export default CardsContainer;