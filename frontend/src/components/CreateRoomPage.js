import React, { Component } from "react";
import Button from "@material-ui/core";
import {
    Grid, Typography, FormHelperText,
    TextField, FormControl, Radio,
    RadioGroup, FormControlLabel
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { render } from "react-dom";

export default class CreateRoomPage extends Component {

    defaultVotes = 2;

    constructor(props) {
        super(props);
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
                        <RadioGroup row defaultValue="true">
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
            </Grid >
        );
    }
}