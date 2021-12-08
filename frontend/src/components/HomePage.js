import React, { Component } from "react";
import { render } from "react-dom";
import { Grid, Typography, ButtonGroup, Button } from "@material-ui/core";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Room from "./Room";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";


export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode : null
        }
    }

    async componentDidMount(){
        fetch('/api/check-in-room').then((response) => 
            response.json()).then((data) => {
            this.setState({
                roomCode: data.code,
            })
        })
    }

    renderHomePage(){
        return(
            <Grid container spacing={3}>
               <Grid item xs={12} align="center">
                    <Typography variant="h3" compact="h3" >
                        House Party
                    </Typography>
               </Grid>
               <Grid item xs={12} align="center">
                  <ButtonGroup disableElevation variant="contained" color="primary">
                      <Button color="primary" to="/create" component={Link}>
                         Create A Room
                      </Button>
                      <Button color="secondary" to="/join" component={Link}>
                         Join A Room
                      </Button>
                    </ButtonGroup>
               </Grid>
            </Grid>
        )
    }

    PrivateRoute({children}) {
        this.state.roomCode ? (<Navigate to={`/room/${this.state.roomCode}`}/>) : (this.renderHomePage())
    }
   

    render() {
        return (
            <div>
                <BrowserRouter>
                <Routes>
                    <Route path="/" element={`<PrivateRoute> 
                    <Private />
                    <PrivateRoute/>`}
                    />
                    <Route path="/create" element={<CreateRoomPage />} />
                    <Route path="/join" element={<RoomJoinPage />} />
                    <Route path={"/croom/:roomCode"} element={<Room />} />
                </Routes>
            </BrowserRouter>
            </div>
        )
    }
}