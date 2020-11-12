import React from 'react';
import GroundList from './GroundList';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
    btn: {
        marginBottom: theme.spacing(2)
    }
}))

export default function GroundMangement() {
    const classes = useStyles();
    return (
        <>
            <Button className={classes.btn} variant="contained" color="primary">
                <AddCircleIcon className="mr-2" /> Add Ground
            </Button>
            <GroundList />
        </>
    );
}
