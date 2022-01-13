import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Collapse} from "@material-ui/core";
export default class CreateRoomPage extends Component {

  static defaultProps = {
    votesToSkip: 2,
    guestCanPause: true,
    roomCode: null,
    update: false,
    updateCallback: () => {

    }
  }
 
  constructor(props) {
    super(props);
    this.state = {
      guestCanPause: this.props.guestCanPause,
      votesToSkip: this.props.votesToSkip,
      successMsg: "",
      errorMsg: "",
    };

    this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
    this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
    this.renderCreateButton = this.renderCreateButton.bind(this);
    this.renderUpdateButton = this.renderUpdateButton.bind(this);
    this.handleUpdateButtonPressed = this.handleUpdateButtonPressed.bind(this);
    this.getCookie = this.getCookie.bind(this);
  }
 
  handleVotesChange(e) {
    this.setState({
      votesToSkip: e.target.value,
    });
  }

  handleGuestCanPauseChange(e) {
    this.setState({
      guestCanPause: e.target.value === "true" ? true : false,
    });
  }

//  getCookie(name) {
//     var cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         var cookies = document.cookie.split(';');
//         for (var i = 0; i < cookies.length; i++) {
//             var cookie = cookies[i].trim();
//             // Does this cookie string begin with the name we want?
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }

getCookie(name){
  let cookieValue = null;
  if(document.cookie && document.cookie !== ''){
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++){
      const cookie = cookies[i].trim();
      //Does this cookie string begin with the name we want?
      if(cookie.substring(0, name.length + 1) === (name + '=')){
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};




handleRoomButtonPressed() {

  const requestOptions = {
    method: "POST",
    headers: {
       "Content-Type": "application/json" },
    body: JSON.stringify({
      votes_to_skip: this.state.votesToSkip,
      guest_can_pause: this.state.guestCanPause,
    }),
  };
  fetch("/api/create-room", requestOptions)
    .then((response) => response.json())
    .then((data) => this.props.history.push("/room/" + data.code));
}


handleUpdateButtonPressed(){
  const requestOptions = {
    method: "PATCH",
    headers: { 
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken")  
    }, 
    body: JSON.stringify({
      votes_to_skip: this.state.votesToSkip,
      guest_can_pause: this.state.guestCanPause,
      code: this.props.roomCode,
    }),
  };
  fetch("/api/update-room", requestOptions)
    .then((response) =>  {
      if(response.ok){
          this.setState({
            successMsg: "Room Updated Successfully",
          })
      }else{
        this.setState({
          errorMsg: "Error Updating Room!!",
        })
      }
     })
 };

renderCreateButton(){
  return(
  <Grid container spacing={1}>
    <Grid item xs={12} align="center">
     <Button
      color="primary"
      variant="contained"
      onClick={this.handleRoomButtonPressed}
     >
       CREATE ROOM
      </Button>
    </Grid>
    <Grid item xs={12} align="center">
      <Button color="secondary" variant="contained" to="/" component={Link}>
       Back
      </Button>
     </Grid>
  </Grid>
  );
}

 renderUpdateButton(){
   return(
    <Grid item xs={12} align="center">
    <Button
     color="primary"
     variant="contained"
     onClick={this.handleUpdateButtonPressed}
    >
      UPDATE ROOM
     </Button>
   </Grid>
   );
 }

  render() {
    const title = this.props.update ? "Update a Room" : "Create a Room";
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
           <Collapse in={this.state.errorMsg != "" || this.state.successMsg !=""}>
              {this.state.successMsg}
           </Collapse>    
        </Grid>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Guest Control of Playback State</div>
            </FormHelperText>
            <RadioGroup
              row
              defaultValue="true"
              onChange={this.handleGuestCanPauseChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type="number"
              onChange={this.handleVotesChange}
              defaultValue={this.state.votesToSkip}
              inputProps={{
                min: 1,
                style: { textAlign: "center" },
              }}
            />
            <FormHelperText>
              <div align="center">Votes Required To Skip Song</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        {this.props.update ? this.renderUpdateButton() : this.renderCreateButton()}
      </Grid>
    );
  }
}
