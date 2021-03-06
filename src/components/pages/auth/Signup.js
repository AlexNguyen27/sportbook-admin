import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";

// COMPONENT
import PageTitle from "../../custom/PageTitle";
import TextFieldInputWithHeader from "../../custom/TextFieldInputWithheader";
import Landing from "../../layout/Landing";

// ACTION
import { signUpUser } from "../../../store/actions/auth";
import { GET_ERRORS } from "../../../store/actions/types";
import { validateEmail } from "../../../utils/commonFunction";
import GoogleLoginCustom from "./component/GoogleLoginCustom";
import { Row, Col } from "reactstrap";
import FacebookLoginCustom from "./component/FacebookLoginCustom";

const Signup = ({
  errors,
  auth: { isAuthenticated, isUser },
  history,
  signUpUser,
}) => {
  const dispatch = useDispatch();
  // FORM DATA STATE
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const { email, password, confirmPassword, firstName, lastName } = formData;

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

    if (formData.password !== formData.confirmPassword) {
      error.confirmPassword = "Confirm password is wrong";
    } else {
      if (error.confirmPassword) delete error.confirmPassword;
    }
    dispatch({
      type: GET_ERRORS,
      errors: error,
    });

    if (JSON.stringify(error) === "{}") {
      const data = { ...formData };
      delete data.confirmPassword;
      signUpUser(isAuthenticated, history, data);
    }
  };

  // Save on change input value
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isAuthenticated && isUser) {
    return <Redirect to="/user/info/yourInfo" />;
  }

  return (
    <Fragment>
      <Grid
        container
        justify="center"
        type="flex"
        style={{ marginTop: "80px" }}
      >
        <Grid item xs={6}>
          <Landing />
        </Grid>
        <Grid item xs={6} className="m-auto">
          <Grid container justify="center" className="login mt-4">
            <Grid item xs={10}>
              <PageTitle title="Create new account" center="true" />
              <Grid container type="flex" spacing={2}>
                <Grid item xs={6}>
                  <FacebookLoginCustom title={"Signup with facebook"}/>
                </Grid>
                <Grid item xs={6}>
                  <GoogleLoginCustom title={"Signup with google"} />
                </Grid>
              </Grid>
              <form onSubmit={(e) => onSubmit(e)}>
                <Row className="row-margin">
                  <Col xs={6}>
                    <TextFieldInputWithHeader
                      header="First Name"
                      name="firstName"
                      className="mt-0"
                      fullWidth
                      value={firstName}
                      onChange={onChange}
                      error={errors.firstName}
                      placeholder="Enter First Name"
                      size="small"
                    />
                  </Col>
                  <Col xs={6}>
                    <TextFieldInputWithHeader
                      header="Last Name"
                      name="lastName"
                      className="mt-0"
                      fullWidth
                      value={lastName}
                      onChange={onChange}
                      error={errors.lastName}
                      placeholder="Enter Last Name"
                      size="small"
                    />
                  </Col>
                </Row>
                <TextFieldInputWithHeader
                  header="Email"
                  name="email"
                  className="mt-0"
                  fullWidth
                  value={email}
                  onChange={onChange}
                  error={errors.email}
                  placeholder="Enter Your Email"
                />

                <TextFieldInputWithHeader
                  header="Password"
                  name="password"
                  placeholder="Enter Password"
                  type="password"
                  value={password}
                  error={errors.password}
                  className="mt-0"
                  fullWidth
                  onChange={onChange}
                />

                <TextFieldInputWithHeader
                  header="Confirm password"
                  name="confirmPassword"
                  placeholder="Enter Confirm password"
                  type="password"
                  value={confirmPassword}
                  error={errors.confirmPassword}
                  className="mt-0"
                  fullWidth
                  onChange={onChange}
                />
                <div className="text-center">
                  <Button
                    className="mt-3 mr-2"
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    REGISTER
                  </Button>
                </div>
              </form>
              <div className="text-center">
                <p
                  style={{ color: "#00bfd8", cursor: "pointer" }}
                  className="mt-3 text-decoration-underline"
                  onClick={() => history.push("/login")}
                >
                  You already have an account?
                </p>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
});
export default connect(mapStateToProps, { signUpUser })(withRouter(Signup));
