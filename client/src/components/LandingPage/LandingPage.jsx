import {Link} from 'react-router-dom'
import style from './LandingPage.module.css'





const LandingPage = () => {
    return(

        <div className= {style.landing}>

        <div>
            
            
            <h1 className={style.title}>
                Do you want to see some dogs?
            </h1>
            
            <Link className={style.title} to="/home">Let's GO HOME!</Link>
        </div>
        </div>
    )
}

export default LandingPage;