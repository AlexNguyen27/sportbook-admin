import React, { Fragment, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";

// COMPONENT
import PageTitle from "../../custom/PageTitle";
import TextFieldInputWithHeader from "../../custom/TextFieldInputWithheader";
import Landing from "../../layout/Landing";

// ACTION
import { loginUser } from "../../../store/actions/auth";
import { GET_ERRORS } from "../../../store/actions/types";
import { validateEmail } from "../../../utils/commonFunction";
const Login = ({
  errors,
  history,
  loginUser,
  auth: { isAuthenticated, isAdmin, isManager },
  match,
}) => {
  const dispatch = useDispatch();
  // FORM DATA STATE
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  // Click button Login
  const onSubmit = (e) => {
    e.preventDefault();
    const error = {};

    Object.keys(formData).map((key) => {
      if (!formData[key] || (formData[key] && formData[key].trim() === "")) {
        error[key] = "This field is required";
      }

      if (!error[key] && key === "email" && !validateEmail(formData[key])) {
        error[key] = "Email is invalid";
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
      const { email, password } = formData;
      loginUser({ email, password });
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
    return isAdmin ? (
      <Redirect to="/orders-list" />
    ) : (
      <Redirect to="/order-management" />
    );
  }

  return (
    <Fragment>
      <Grid
        container
        justify="center"
        type="flex"
        style={{ marginTop: "80px" }}
      >
        <Grid item xs={6} className="m-auto">
          <Grid container justify="center" className="login mt-4">
            <Grid item xs={10}>
              <PageTitle title="Login to continue" center="true" />
              <Grid container type="flex" spacing={2}>
                <Grid item xs={6}>
                  <Button
                    className="mt-3 w-100"
                    variant="contained"
                    style={{ backgroundColor: "#3f72af", color: "white" }}
                    type="submit"
                  >
                    Facebook
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    className="mt-3 w-100"
                    variant="contained"
                    type="submit"
                    style={{ backgroundColor: "#ec524b", color: "white" }}
                  >
                    Google
                  </Button>
                </Grid>
              </Grid>
              <form onSubmit={(e) => onSubmit(e)}>
                <TextFieldInputWithHeader
                  header="Email"
                  name="email"
                  className="mt-0"
                  fullWidth
                  value={email}
                  onChange={onChange}
                  error={errors.email || errors.message}
                  placeholder="Enter your email address"
                  variant="outlined"
                />

                <TextFieldInputWithHeader
                  header="Password"
                  name="password"
                  placeholder="Enter password"
                  type="password"
                  value={password}
                  error={errors.password || errors.message}
                  className="mt-0"
                  fullWidth
                  onChange={onChange}
                  variant="outlined"
                />
                <Button
                  className="mt-3 w-100"
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Login
                </Button>
              </form>
              <div className="text-center">
                <p
                  style={{ color: "#00bfd8", cursor: "pointer" }}
                  className="mt-3 text-decoration-underline"
                  onClick={() => history.push("reset-password")}
                >
                  Forgot password?
                </p>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Landing />
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
