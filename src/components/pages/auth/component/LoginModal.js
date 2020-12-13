import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { clearErrors } from "../../../../store/actions/common";
// COMPONENTS
import Button from "@material-ui/core/Button";
import TextFieldInputWithHeader from "../../../custom/TextFieldInputWithheader";

import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";
import { GET_ERRORS } from "../../../../store/actions/types";
import PageLoader from "../../../custom/PageLoader";
import { Redirect } from "react-router-dom";
import { loginWithGoogle } from "../../../../store/actions/auth";

const LoginModal = ({
  errors,
  clearErrors,
  modal,
  setModal,
  userData,
  auth: { isAuthenticated, isAdmin },
  loginWithGoogle,
  title="Google"
}) => {
  const dispatch = useDispatch();

  console.log("sd-------------------------", userData);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    googleEmail: userData?.email || "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setFormData({
      ...formData,
      googleEmail: userData?.email || "",
    });
    clearErrors();
  }, [userData?.email]);

  // CLOSE MODAL ACTION
  const closeModal = () => {
    setModal(false);
    clearErrors();
    setFormData({
      googleEmail: userData?.email || "",
      newPassword: "",
      confirmPassword: "",
    });
  };
  const { googleEmail, newPassword, confirmPassword } = formData;
  console.log(googleEmail);

  // Click button Login
  const onSubmit = (e) => {
    e.preventDefault();
    const error = {};

    if (!newPassword.trim()) {
      error.newPassword = "This field is required";
    }

    if (!confirmPassword.trim()) {
      error.confirmPassword = "This field is required";
    }

    if (formData.newPassword !== formData.confirmPassword) {
      error.confirmPassword = "Confirm password is incorrect";
    } else {
      if (error.confirmPassword) delete error.confirmPassword;
    }

    dispatch({
      type: GET_ERRORS,
      errors: error,
    });

    if (JSON.stringify(error) === "{}") {
      const formatData = {
        email: googleEmail,
        password: newPassword,
        firstName: userData?.familyName || "",
        lastName: userData?.givenName || "",
        avatar: userData?.imageUrl,
      };
      console.log(formatData);
      setLoading(true);
      loginWithGoogle(setLoading, setModal, formatData);
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
    <Modal isOpen={modal} centered={true}>
      <PageLoader loading={loading} noPadding>
        <ModalHeader toggle={() => closeModal()}>Login with {title}</ModalHeader>

        {/** MODAL BODY */}
        <Form onSubmit={(e) => onSubmit(e)}>
          <ModalBody>
            <Row>
              <Col xs="12">
                <TextFieldInputWithHeader
                  name="googleEmail"
                  className="mt-0"
                  fullWidth
                  label="Email"
                  value={googleEmail}
                  defaultValue={googleEmail}
                  onChange={onChange}
                  error={errors.email || errors.message}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Col>
              <Col xs="12" className="mt-4">
                <TextFieldInputWithHeader
                  name="newPassword"
                  label="Love sport password"
                  placeholder="Enter password"
                  type="password"
                  value={newPassword}
                  error={
                    errors.password || errors.newPassword || errors.message
                  }
                  className="mt-0"
                  fullWidth
                  onChange={onChange}
                  variant="outlined"
                  size="small"
                />
              </Col>
              <Col xs="12" className="mt-4">
                <TextFieldInputWithHeader
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  error={errors.confirmPassword || errors.message}
                  className="mt-0"
                  fullWidth
                  onChange={onChange}
                  variant="outlined"
                  size="small"
                />
              </Col>
            </Row>
          </ModalBody>
          {/** MODAL FOOTER */}
          <ModalFooter>
            <Button variant="contained" color="primary" type="submit">
              Continue login
            </Button>
            <Button
              variant="contained"
              className="ml-2"
              onClick={() => closeModal()}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </PageLoader>
    </Modal>
  );
};
const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  clearErrors,
  loginWithGoogle,
})(LoginModal);
