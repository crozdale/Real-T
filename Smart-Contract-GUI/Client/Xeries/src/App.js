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

axios.defaults.baseURL = `https://bitbrowze.com/xeries`;
// axios.defaults.baseURL = 'http://localhost:5000/xeries';

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/xeries/" component={Main} />
          <Route path="/xeries/home" component={Home} />
          <Route path="/xeries/admin" component={Admin} />
          <ProtectedRoute path="/xeries/profile" component={Profile} />
          <Route path="/xeries/gallery" component={Gallery} />
          <Route path="/xeries/listing/:id" component={ListingDetails} />
          <ProtectedRoute path="/xeries/manage" component={WithNavBar(Listings)} />
          <ProtectedRoute path="/xeries/cart" component={Cart} />
          <ProtectedRoute path="/xeries/checkout" component={Checkout} />
          <ProtectedRoute path="/xeries/orders" component={() => <Orders isAdmin={false}/> } />
          <Route exact path="/xeries/register" component={Register} />
          <Route exact path="/xeries/login" component={Login} />
          <Route path="/xeries/:username" component={PersonalGalery} />
          <Route exact path="*" component={PageNotFound} />
        </Switch>
      </Router>
  );
}

export default App;
