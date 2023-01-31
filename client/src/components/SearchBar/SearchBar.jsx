import React, {useState} from 'react';
import {searchDog} from '../../Redux/action'
import { useDispatch } from 'react-redux';
import style from "./SearchBar.module.css"





//función para buscar los perros por nombre de raza
const SearchBar = () => {

    const dispatch = useDispatch('')

    const [dogName, setDogName] = useState('')

    const handleChange = (event) => {
        setDogName(event.target.value)
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(searchDog(dogName))
    }


    return(
        <form  className={style.searchBarObject} onSubmit={handleSubmit}>
            
            <input  className={style.input} type="text" placeholder='Find dogs by name...' 
            onChange={handleChange} value={dogName}/>
            <input className={style.button} type="submit" value="FIND" />
            
        </form>
    )
}

export default SearchBar;