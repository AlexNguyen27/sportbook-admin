import React, { Fragment, useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Redirect, withRouter, matchPath } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { Button, Container } from "@material-ui/core";

// COMPONENT
import PageTitle from "../../custom/PageTitle";
import TextFieldInputWithHeader from "../../custom/TextFieldInputWithheader";
import Landing from "../../layout/Landing";

// ACTION
import { loginUser } from "../../../store/actions/auth";
import { GET_ERRORS } from "../../../store/actions/types";
const ResetPassword = ({
  errors,
  history,
  loginUser,
  auth: { isAuthenticated, isAdmin },
  match,
}) => {
  const dispatch = useDispatch();
  // FORM DATA STATE
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // Click button Login
  const onSubmit = (e) => {
    e.preventDefault();
    const error = {};

    Object.keys(formData).map((key) => {
      if (!formData[key] || (formData[key] && formData[key].trim() === "")) {
        error[key] = "This field is required";
      }
    });

    if (JSON.stringify(error) === "{}" && !validateEmail(email)) {
      error.email = "Email is invalid!";
    }

    dispatch({
      type: GET_ERRORS,
      errors: error,
    });

    if (JSON.stringify(error) === "{}") {
      const { email } = formData;
      console.log(email);
      //   resetPassword({ email });
    }
  };

  // Save on change input value
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Fragment>
      <Landing />
      <Grid container justify="center">
        <Grid item xs={12} sm={4}>
          <form onSubmit={(e) => onSubmit(e)}>
            <PageTitle title="Forgot password" center="true" />
            <TextFieldInputWithHeader
              header="Email address"
              name="email"
              placeholder="Enter Your email address"
              type="email"
              value={email}
              error={errors.email}
              className="mt-0"
              fullWidth
              onChange={onChange}
            />
            <Grid container justify="center" spacing={4}>
              <Grid item>
                <Button
                  className="mt-3"
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </form>
          <div className="text-center">
            <p
              style={{ color: "blue", cursor: "pointer" }}
              className="mt-3 text-decoration-underline"
              onClick={() => history.push("login")}
            >
              Don't need to reset password? Login here.
            </p>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
});
export default connect(mapStateToProps, { loginUser })(
  withRouter(ResetPassword)
);
