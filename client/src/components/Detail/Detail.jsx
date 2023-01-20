import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogDetail } from "../../Redux/action"


const Detail = () => {

    const dispatch = useDispatch()
    const { id } = useParams();
    console.log(id)
    useEffect(()=>{
        dispatch(getDogDetail(id))
    },[dispatch, id])

    const detail = useSelector((state) => state.detail);

    if (!detail.id) {
        return (
          <div>
            <h1>Loading</h1>
          </div>
        );
      }

    return(
        <div>
            <h1>This is the detail from a specific dog</h1>
            <h1>{detail.name}</h1>
            <img src={detail.image} alt=""/>
            <h3>Height: {detail.height}</h3>
            <h3>Weight: {detail.weight}</h3>
            <h3>Life_span: {detail.life_span}</h3>
            <h3>Temperament: {detail.temperament}</h3>
        </div>
    )
}

export default Detail;