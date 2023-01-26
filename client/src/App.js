import { Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Form from './components/Form/Form';
import Detail from './components/Detail/Detail';


function App() {


  return (
    <div className="App">
    
      <Route exact path="/">
        <LandingPage/>
      </Route>

      <Route path="/home">
        <Home/>
      </Route>

      <Route path="/detail/:id">
        <Detail/>
      </Route>

      <Route path="/create">
        <Form/>
      </Route>

      
    </div>
  );
}

export default App;
