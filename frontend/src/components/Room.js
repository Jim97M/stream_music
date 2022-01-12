import React, { Component } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import CreateRoomPage from './CreateRoomPage';
export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
      showSettings: false,
      spotifyAuthenticate: false,
    };
    this.roomCode = this.props.match.params.roomCode;
    this.getRoomDetails();
    this.leaveRoomRequest = this.leaveRoomRequest.bind(this);
    this.updateShowSettings = this.updateShowSettings.bind(this);
    this.renderUpdateButton = this.renderUpdateButton.bind(this);
    this.renderSettings = this.renderSettings.bind(this);
    this.isSpotifyAuthenticate = this.isSpotifyAuthenticate.bind(this);
  }

  getRoomDetails() {
    fetch("/api/get-room" + "?code=" + this.roomCode)
      .then((response) => {
         if(!response.ok){
           this.props.leaveRoomCallback();
           this.props.history.push("/");
         }  
        response.json()
      })
      .then((data) => {
        this.setState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      });

      if(!this.state.isHost){
        this.isSpotifyAuthenticate()
      }
  }

  isSpotifyAuthenticate(){
       fetch('/spotify/is-authenticated').then((response) => response.json()).then((data) => {
         this.setState({spotifyAuthenticate: data.status});
         if(!data.status){
           fetch('/spotify/get-spotify-auth').then((response) => response.json()).then((data) => {
             window.location.replace(data.url);
           })
          }

         });
  };

  leaveRoomRequest(){
      const requestOptions = {
        method: "POST",
        headers: {"Content-Type":"application/json"},
      };

       fetch('/api/leave-session', requestOptions).then((_response)=>{
         this.props.leaveRoomCallback();
         this.props.history.push("/");
       });
  }

  updateShowSettings(value){
    this.setState({
      showSettings: value,
    })
  }

  renderSettings(){
    return(
      <Grid container spacing="1">
          <Grid item xs={12} alignItems="center">
              <CreateRoomPage 
                 update={true}
                 votesToSkip={this.state.votesToSkip}
                 guestCanPause={this.state.guestCanPause}
                 roomCode={this.roomCode}
                 updateCallback ={() => { }}/>
          </Grid>
          <Grid xs={12} alignItems="center">
          <Button 
                variant="contained"
                color="settings"
                onClick={() => this.updateShowSettings(false)}>
                 Close
          </Button>
          </Grid>
      </Grid>
    )
  }

  renderUpdateButton(){
    return(
      <Grid item xs={12} align="center">
        <Button 
          variant="contained"
          color="primary"
          onClick={() => this.updateShowSettings(true)}>
            Settings
          </Button>
      </Grid>
    );
  }

  render() {
    if (this.state.showSettings){
       return this.renderSettings();
    } 
    return (
         <Grid container spacing={1}>
            <Grid item xs={12} align="center">
               <Typography variant="h4" component="h4">
                  Code: {this.roomCode}
               </Typography>
            </Grid>
            <Grid item xs={12} align="center">
            <Typography variant="h5" component="h5">
                  Votes: {this.state.votesToSkip}
               </Typography>
            </Grid>
            <Grid item xs={12} align="center">
            <Typography variant="h5" component="h5">
                  Guest: {this.state.guestCanPause.toString()}
               </Typography>
            </Grid>
            <Grid item xs={12} align="center">
            <Typography variant="h5" component="h5">
                  Host: {this.state.isHost.toString()}
               </Typography>
           </Grid>
           {this.state.isHost == false ? this.renderUpdateButton() : null}
           <Grid item xs={12} align="center">
               <Button variant="contained" color="secondary" onClick={this.leaveRoomRequest}>
                    Leave Music Room
               </Button>
           </Grid>
         </Grid>
      );
  }
}

