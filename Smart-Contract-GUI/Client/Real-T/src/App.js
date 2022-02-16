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
axios.defaults.baseURL = `https://bitbrowze.com/real-t`;
// axios.defaults.baseURL = 'http://localhost:5000/real-t';

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/real-t" component={Main} />
          <Route path="/real-t/home" component={Home} />
          <Route path="/real-t/admin" component={Admin} />
          <ProtectedRoute path="/real-t/profile" component={Profile} />
          <Route path="/real-t/properties" component={Gallery} />
          <Route path="/real-t/listing/:id" component={ListingDetails} />
          <ProtectedRoute path="/real-t/manage" component={WithNavBar(Listings)} />
          <ProtectedRoute path="/real-t/cart" component={Cart} />
          <ProtectedRoute path="/real-t/checkout" component={Checkout} />
          <ProtectedRoute path="/real-t/orders" component={() => <Orders isAdmin={false}/> } />
          <Route exact path="/real-t/register" component={Register} />
          <Route exact path="/real-t/login" component={Login} />
          <Route path="/real-t/:username" component={PersonalGalery} />
          <Route exact path="*" component={PageNotFound} />
        </Switch>
      </Router>
  );
}

export default App;
