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
// import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:5000';

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/real-t" component={Main} />
          <Route path="/real-t/home" component={Home} />
          <Route path="/real-t/admin" component={Admin} />
          <ProtectedRoute path="/real-t/profile" component={Profile} />
          <Route exact path="/real-t/register" component={Register} />
          <Route exact path="/real-t/login" component={Login} />
          <Route exact path="*" component={PageNotFound} />
        </Switch>
      </Router>
  );
}

export default App;
