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
import Category from './pages/Category/Category';
import Detail from './pages/Detail/Detail';
import { UserTemplate } from './templates/UserTemplate/UserTemplate';

export const history = createBrowserHistory();

function App() { 
  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate path="/" exact Component={Home} />
        <HomeTemplate path="/contact" exact Component={Contact} />
        <HomeTemplate path="/cart" exact Component={Cart} />
        <HomeTemplate path="/about" exact Component={AboutUS}/>
        <HomeTemplate path="/category" exact Component={Category}/>
        <HomeTemplate path="/detail/:id" exact Component={Detail}/>

        <Route path="/register" exact Component={Register}/>
        <UserTemplate path="/login" exact Component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
