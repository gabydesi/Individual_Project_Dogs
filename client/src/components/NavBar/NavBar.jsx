import { Link } from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css"

const NavBar = () => {
    return(
        <div className={style.mainContainer}>
            
            <Link className={style.button} to="/home">HOME</Link>
            <Link className={style.button} to="/create">CREATE DOG</Link>
        
            
            <SearchBar/>

           
        </div>
    )
}

export default NavBar;