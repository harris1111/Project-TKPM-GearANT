import './App.css';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch} from 'react-router';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Contact from './pages/Contact/Contact';
import Cart from './pages/Cart/Cart';
import AboutUS from './pages/AboutUs/AboutUS';

export const history = createBrowserHistory();

function App() { 
  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate path="/" exact Component={Home} />
        <HomeTemplate path="/contact" exact Component={Contact} />
        <HomeTemplate path="/cart" exact Component={Cart} />
        <HomeTemplate path="/about" exact Component={AboutUS}/>
        <Route path="/login" exact Component={Login} />
        <Route path="/register" exact Component={Register}/>
      </Switch>
    </Router>
  );
}

export default App;
