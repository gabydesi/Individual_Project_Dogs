import CardsContainer from "../CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "../../Redux/action";

const Home = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getDogs())
    },[dispatch])

    return(
        <div>
            <h1>This is the Home view (Maquetando)</h1>
            <CardsContainer/>
        </div>
    )
}

export default Home;