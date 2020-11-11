import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MyCalendar from '../../custom/MyCalendar';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'inline',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 250,
    },
    btn: {
        marginRight: theme.spacing(4)
    },
    btnRight: {
        marginLeft: theme.spacing(4)
    }
}));

const GroundManagement = (props) => {
    const classes = useStyles();

    return (
        <Grid container type="flex" justify="center">
            <Grid item xs={12}>
                {/* <Grid container> */}
                <Button className={classes.btn} variant="contained" color="primary">
                    Add new order
                </Button>
                <form className={classes.container} noValidate>
                    <TextField
                        id="datetime-local"
                        label="Next appointment"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </form>
                {/* <Button className={classes.btnRight} color="primary">
                    Today
                </Button> */}
                <div className="mt-4"></div>
                <MyCalendar />
                {/* </Grid> */}
            </Grid>
            <Grid item>

            </Grid>
        </Grid>
    );
}

export default GroundManagement;