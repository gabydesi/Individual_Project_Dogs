import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogDetail } from "../../Redux/action"
import { Link } from "react-router-dom";
import style from "./Detail.module.css"
import logo from '../images/logo.png'


const Detail = () => {

    const dispatch = useDispatch()
    const { id } = useParams();
    
    useEffect(()=>{
        dispatch(getDogDetail(id))
    },[dispatch, id])

    const detail = useSelector((state) => state.detail);

    dispatch({type: "reset"})

    if (!detail.id) {
        return (
          <div>
            <h1>Loading</h1>
          </div>
        );
      }

    return(

        <div className={style.detail_content}>
          <div>
            <br/>
            <br/>
            <Link className={style.button} to="/home">BACK HOME</Link>
          </div>

          <div>

            <h1>{detail.name}</h1>
            <img className={style.imageSize} src={detail.image} alt=""/>
            <h3>Height min: {detail.height_min} cm</h3>
            <h3>Height max: {detail.height_max} cm</h3>
            <h3>Weight min: {detail.weight_min} Kg</h3>
            <h3>Weight max: {detail.weight_max} Kg</h3>
            <h3>Life_span: {detail.life_span}</h3>
            <h3>Temperament: {detail.temperament}</h3>
          </div>

          <div>
            <img className={style.logo} src={logo} alt=""/>
            </div>
          

        </div>
    )
}

export default Detail;