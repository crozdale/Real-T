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
const axios = require('axios');

axios.defaults.baseURL = `http://bitbrowze.com/real-t`;

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/xeries" component={Main} />
          <Route path="/xeries/home" component={Home} />
          <Route path="/xeries/admin" component={Admin} />
          <ProtectedRoute path="/xeries/profile" component={Profile} />
          <Route exact path="/xeries/register" component={Register} />
          <Route exact path="/xeries/login" component={Login} />
          <Route exact path="*" component={PageNotFound} />
        </Switch>
      </Router>
  );
}

export default App;
