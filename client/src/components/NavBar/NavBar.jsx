import { Link } from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";
import logo from "../images/logo.png"

const NavBar = () => {
    return(
        <div className={style.mainContainer}>
            
            
            <img className={style.logo} src={logo} alt=""/>
            

            <Link className={style.button} to="/home">HOME</Link>
            <Link className={style.button} to="/create">CREATE DOG</Link>
        
            
            <SearchBar/>

           
        </div>
    )
}

export default NavBar;