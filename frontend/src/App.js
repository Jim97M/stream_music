import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Layout from "./hocs/Layout";
import Home from "./components/Home";
import HomePage from "./components/HomePage";
import Login from "./containers/Login";
import SignUp from "./containers/SignUp";
import Activate from "./containers/Activate";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";


export default class App extends Component {
    constructor(props){
        super(props);
    }

    render(){
    return(
        <Provider store={store}>
           <Router>
               <Layout>
                   <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={SignUp} />
                        <Route exact path="/reset-password" component={ResetPassword}/>
                        <Route exact path="/reset-confirm-password/:uid/:token" component={ResetPasswordConfirm}/>
                        <Route exact path="/activate/:uid/:token" component={ResetPasswordConfirm} />
                   </Switch>
               </Layout>
           </Router>
        </Provider>
        );
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);