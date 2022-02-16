import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./App.css";
import 'antd/dist/antd.css';
import Profile from './containers/Profile';
import Register from './containers/Register';
import ProtectedRoute from './containers/ProtectedRoute';
import Login from './containers/Login';
import PageNotFound from './components/PageNotFound';
import Home from "./containers/Home";
import Main from "./containers/Main";
import Admin from "./containers/Admin";
import Gallery from "./containers/Gallery";
import WithNavBar from "./containers/WithNavBar";
import Listings from "./components/Listings";
import Cart from "./containers/Cart";
import PersonalGalery from "./containers/PersonalGallery";
import ListingDetails from "./containers/ListingDetails";
import Checkout from "./containers/Checkout";
import Orders from "./components/AdminPanel/Orders";
const axios = require('axios');
axios.defaults.baseURL = `https://bitbrowze.com/copyright`;
// axios.defaults.baseURL = 'http://localhost:5000/copyright';

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/copyright" component={Main} />
          <Route path="/copyright/home" component={Home} />
          <Route path="/copyright/admin" component={Admin} />
          <ProtectedRoute path="/copyright/profile" component={Profile} />
          <Route path="/copyright/writings" component={Gallery} />
          <Route path="/copyright/Fascination" component={() => <Gallery category='Fascination'/>} />
          <Route path="/copyright/iProprietor" component={() => <Gallery category='iProprietor'/>} />
          <Route path="/copyright/listing/:id" component={ListingDetails} />
          <ProtectedRoute path="/copyright/manage" component={WithNavBar(Listings)} />
          <ProtectedRoute path="/copyright/cart" component={Cart} />
          <ProtectedRoute path="/copyright/checkout" component={Checkout} />
          <ProtectedRoute path="/copyright/orders" component={() => <Orders isAdmin={false}/> } />
          <Route exact path="/copyright/register" component={Register} />
          <Route exact path="/copyright/login" component={Login} />
          <Route path="/copyright/:username" component={PersonalGalery} />
          <Route exact path="*" component={PageNotFound} />
        </Switch>
      </Router>
  );
}

export default App;
