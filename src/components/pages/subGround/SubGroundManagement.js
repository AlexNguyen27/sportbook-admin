import React from 'react';
import SubGroundList from './SubGroundList';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
    btn: {
        marginBottom: theme.spacing(2)
    }
}))

const SubGroundManagement = (props) => {
    const classes = useStyles();

    return (
        <>
            <Button className={classes.btn} variant="contained" color="primary">
                <AddCircleIcon className="mr-2" /> Add New Sub Ground
            </Button>
            <SubGroundList />
        </>
    );
}

export default SubGroundManagement;