import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";

import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom"
export default class App extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create" element={<CreateRoomPage />} />
                    <Route path="/join" element={<RoomJoinPage />} />
                </Routes>
            </BrowserRouter>
        );
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);