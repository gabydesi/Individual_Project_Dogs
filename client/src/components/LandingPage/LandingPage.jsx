import {Link} from 'react-router-dom'

const LandingPage = () => {
    return(
        <div>
            <h1>Do you want to see some dogs?</h1>
            <Link to="/home">Let's GO HOME!</Link>
        </div>
    )
}

export default LandingPage;