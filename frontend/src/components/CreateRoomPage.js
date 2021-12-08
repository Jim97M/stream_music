import React, { Component } from "react";
import {
    Grid, Typography, FormHelperText,
    TextField, FormControl, Radio,
    RadioGroup, FormControlLabel
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

import { render } from "react-dom";

export default class CreateRoomPage extends Component {

    defaultVotes = 2;

    constructor(props) {
        super(props);
        this.state = {
            guestCanPause : true,
            votesToSKip : this.defaultVotes,
            isHost: true
        }

        this.handleButtonPressed = this.handleButtonPressed.bind(this);
        this.handleGuestCanPause = this.handleGuestCanPause.bind(this);
        this.handleVotesToSkip = this.handleVotesToSkip.bind(this);
        
    }

    handleVotesToSkip(e){
        this.setState ({
            votesToSKip: e.target.value
        })
    }

    handleGuestCanPause(e){
        this.setState ({
          guestCanPause: e.target.value === "true" ? true : false
        })
    }
   

    handleButtonPressed(){
        function getCookie(name) {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
            }
            const csrftoken = getCookie('csrftoken');

      const requestOptions = {
          method: "POST",
          headers: {"Content-Type": "application/json", 'X-CSRFToken': csrftoken},
          mode: 'same-origin',
          body: JSON.stringify({
              guest_can_pause: this.state.guestCanPause,
              votes_to_skip: this.state.votesToSKip
              
          }),
      };

      fetch('/api/room', requestOptions).then((response) => 
          response.json()).then((data) => this.props.history.push("/croom/" + data.code));
    }

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        Create A Room
                    </Typography>
                </Grid>


                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText>
                            <div align="center">
                                Play Or Pause Music
                            </div>
                        </FormHelperText>
                        <RadioGroup row defaultValue="true" onChange={this.handleGuestCanPause}>
                            <FormControlLabel value="true"
                                control={<Radio color="primary" />}
                                label="Play/Pause"
                                labelPlacement="bottom"
                            />
                            <FormControlLabel value="false"
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
                            type="number"
                            required={true}
                            onChange={this.handleVotesToSkip}
                            inputProps={{
                                min: 1,
                                style: { textAlign: "center" }
                            }}
                            defaultValue={this.defaultVotes}

                        />
                        <FormHelperText>
                            <div align="center">Votes Required To Skip Song</div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" onClick={this.handleButtonPressed}>
                       Create A Room
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" to="/" component={Link}> 
                       Back Home
                    </Button>
                </Grid>
            </Grid >
        );
    }
}