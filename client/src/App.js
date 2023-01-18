import { Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Form from './components/Form/Form';
import Detail from './components/Detail/Detail';
import NavBar from './components/NavBar/NavBar';

function App() {


  return (
    <div className="App">

      <NavBar/>
    
      <Route exact path="/">
        <LandingPage/>
      </Route>

      <Route path="/home">
        <Home/>
      </Route>

      <Route path="/detail">
        <Detail/>
      </Route>

      <Route path="/create">
        <Form/>
      </Route>

      
    </div>
  );
}

export default App;
