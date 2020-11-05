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
const Login = ({
  errors,
  history,
  loginUser,
  auth: { isAuthenticated, isAdmin },
  match,
}) => {
  const dispatch = useDispatch();
  // FORM DATA STATE
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  // Click button Login
  const onSubmit = (e) => {
    e.preventDefault();
    const error = {};

    Object.keys(formData).map((key) => {
      // console.log("-------------------", formData);
      // console.log(key);
      if (!formData[key] || (formData[key] && formData[key].trim() === "")) {
        error[key] = "This field is required";
      }

      // if (!error[key] && key === "email" && !validateEmail(formData[key])) {
      //   error[key] = "Email is invalid";
      // }
    });

    dispatch({
      type: GET_ERRORS,
      errors: error,
    });

    if (JSON.stringify(error) === "{}") {
      const { username, password } = formData;
      loginUser({ username, password });
    }
  };

  // Save on change input value
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isAuthenticated) {
    if (isAdmin) {
      return <Redirect to="/users-list" />;
    }
    if (match.path === "/news-feed") {
      return <Redirect to="/news-feed" />;
    }
    return <Redirect to="/news-feed" />;
  }

  return (
    <Fragment>
      <Landing />
      <Grid container justify="center">
        <Grid item xs={12} sm={4}>
          <form onSubmit={(e) => onSubmit(e)}>
            <PageTitle title="Login" center="true" />
            <TextFieldInputWithHeader
              header="Username"
              name="username"
              className="mt-0"
              fullWidth
              value={username}
              onChange={onChange}
              error={errors.username || errors.message}
              placeholder="Enter Username"
            />

            <TextFieldInputWithHeader
              header="Password"
              name="password"
              placeholder="Enter Password"
              type="password"
              value={password}
              error={errors.password || errors.message}
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
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
          <div className="text-center">
            <p
              style={{ color: "blue", cursor: "pointer" }}
              className="mt-3 text-decoration-underline"
              onClick={() => history.push('reset-password')}
            >
              Forgot password?
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
export default connect(mapStateToProps, { loginUser })(withRouter(Login));
