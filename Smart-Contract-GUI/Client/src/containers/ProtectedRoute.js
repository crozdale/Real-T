import { Route, Redirect } from "react-router-dom";
import React from "react";
import { checkAuth } from '../api/user';
class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isLoggedIn: false
        };
        checkAuth().then(() => this.setState(() => ({ isLoading: false, isLoggedIn: true })))
        .catch(() => this.setState(() => ({ isLoading: false, isLoggedIn: false })));
    }

    render() {
        return this.state.isLoading ? null :
            this.state.isLoggedIn ?
            <Route path={this.props.path} component={this.props.component} exact={this.props.exact}/> :
            <Redirect to={{ pathname: '/real-t/home', state: { from: this.props.location } }} />
    }

}

export default PrivateRoute;
