import React, { Component } from "react";
import { render } from "react-dom";
import Home from "./Home";
import HomePage from "./HomePage";
export default class App extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="App">
                {/* <HomePage /> */}
                 <Home />
            </div>
        );
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);