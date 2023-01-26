import React, {useState} from 'react';
import {searchDog} from '../../Redux/action'
import { useDispatch } from 'react-redux';





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
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Find dogs by name...' onChange={handleChange} value={dogName}/>
            <input type="submit" value="Find" />
        </form>
    )
}

export default SearchBar;