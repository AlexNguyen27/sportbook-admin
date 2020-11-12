import React, { useState } from 'react';
import SubGroundList from './SubGroundList';
import { connect } from 'react-redux';
import { Button, Grid } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TextFieldInput from '../../custom/TextFieldInputWithheader';

// const useStyles = makeStyles((theme) => ({
//     btn: {
//         marginBottom: theme.spacing(2)
//     }
// }))

const SubGroundManagement = (props) => {
    // const classes = useStyles();

    const [formData, setFormData] = useState({
        name: ''
    });

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Click button Login
    const onSubmit = (e) => {
        console.log('herer')
        e.preventDefault();
        const error = {};
        console.log(name)
        // eslint-disable-next-line array-callback-return
        Object.keys(formData).map((key) => {
            if (!formData[key] || (formData[key] && formData[key].trim() === "")) {
                error[key] = "This field is required";
            }
        });
        // dispatch({
        //   type: GET_ERRORS,
        //   errors: error,
        // });

        // if (JSON.stringify(error) === "{}") {
        //   const { email, password } = formData;
        //   loginUser({ email, password });
        // }
    };

    const { name } = formData;
    return (
        <>
            <form onSubmit={(e) => onSubmit(e)}>
                <Grid container type="flex" justify="left" alignItems="flex-end" className="mb-4">
                    <Grid item xs={3}>
                        <TextFieldInput
                            required
                            id="outlined-multiline-flexible"
                            name="name"
                            label="Subground name"
                            fullWidth
                            value={name}
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item xs={4} style={{ marginLeft: '16px' }}>
                        <Button type="submit" variant="contained" color="primary">
                            <AddCircleIcon className="mr-2" /> Add
                    </Button>
                    </Grid>
                </Grid>
            </form>
            <SubGroundList />
        </>
    );
}


const mapStateToProps = (state) => ({
    errors: state.errors,
    auth: state.auth,
});
export default connect(mapStateToProps, {})(SubGroundManagement);;