import style from "./Card.module.css"
import {Link} from "react-router-dom"


//Este componente debe mostrar la info de cada dog mapeado
//pero además darnos un link para ir al detail del dog específico

//componente dumb
const Card = (props) => {
    return(
        <div className={style.card}>

            <div>

            
            <Link to={`/detail/${props.id}`} className={style.card_img}>
            <img src={props.image} alt={props.name} height="190px" width="190px"/>
            <h3>{props.name}</h3>
            <h5>{props.temperament}</h5>
            <h5>Weight min: {props.weight_min} Kg</h5>
            <h5>Weight max: {props.weight_max} Kg</h5>
            </Link>
            

            </div>
        </div>
    )
}





export default Card;