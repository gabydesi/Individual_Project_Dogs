import React from "react";
import CardsContainer from "../CardsContainer/CardsContainer";
import NavBar from "../NavBar/NavBar";
import style from "./Home.module.css"



const Home = () => {

    
    return(

        <div className={style.home_back}>

            <NavBar/>

            <CardsContainer/>
        

        </div>
    )
}

export default Home;