import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";

import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";
import Button from "@material-ui/core/Button";
import TextFieldInputWithHeader from "../../../custom/TextFieldInputWithheader";
import { GET_ERRORS } from "../../../../store/actions/types";
import { clearErrors } from "../../../../store/actions/common";
import { updatePassword } from "../../../../store/actions/user";
import PageLoader from "../../../custom/PageLoader";

const ChangePasswordModal = ({
  auth: { user },
  updatePassword,
  clearErrors,
  errors,
  modal,
  setModal,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // PASSWORD STATE
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
    currentPassword: "",
  });
  const { newPassword, confirmPassword, currentPassword } = password;

  // Save on change input value
  const onChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };
  // CLOSE MODAL ACTION
  const closeModal = () => {
    setModal(false);
    clearErrors();
    setPassword({
      newPassword: "",
      confirmPassword: "",
      currentPassword: "",
    });
  };

  // HANDLE ON SUBMIT FROM ADD NEW GROUP
  const onSubmit = (e) => {
    e.preventDefault();

    const error = {};

    Object.keys(password).map((key) => {
      if (password[key].trim() === "") {
        error[key] = "This field is required";
      }
    });

    if (newPassword.trim() !== confirmPassword.trim()) {
      error.confirmPassword = "Confirm password did not match!!";
    }
    if (newPassword.trim().length < 6 || newPassword.trim().length > 42) {
      error.newPassword = 'Password must be more than 6 and 42 characters';
    }

    dispatch({
      type: GET_ERRORS,
      errors: error,
    });

    if (JSON.stringify(error) === "{}") {
      setLoading(true);
      const { currentPassword, newPassword, confirmPassword } = password;
      updatePassword(setLoading, currentPassword, newPassword, confirmPassword);
    }
  };

  return (
    <Modal isOpen={modal} toggle={() => closeModal()} centered={true}>
      <PageLoader loading={loading} noPadding>
        <ModalHeader toggle={() => closeModal()}>
          Change my password
        </ModalHeader>

        {/** MODAL BODY */}
        <Form onSubmit={(e) => onSubmit(e)}>
          <ModalBody>
            <Row>
              <Col xs="12">
                <TextFieldInputWithHeader
                  id="outlined-multiline-flexible"
                  name="currentPassword"
                  label="Current password"
                  fullWidth
                  type="password"
                  value={currentPassword}
                  onChange={onChange}
                  error={errors.currentPassword}
                />
              </Col>
              <Col xs="12" className="mt-4">
                <TextFieldInputWithHeader
                  id="outlined-multiline-static"
                  label="New Password"
                  name="newPassword"
                  type="password"
                  value={newPassword}
                  fullWidth
                  onChange={onChange}
                  error={errors.newPassword}
                />
              </Col>
              <Col xs="12" className="mt-4">
                <TextFieldInputWithHeader
                  id="outlined-multiline-static"
                  label="Confirm password"
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  fullWidth
                  onChange={onChange}
                  error={errors.confirmPassword}
                />
              </Col>
            </Row>
          </ModalBody>

          {/** MODAL FOOTER */}
          <ModalFooter>
            <Button variant="contained" color="primary" type="submit">
              Save
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
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { clearErrors, updatePassword })(
  ChangePasswordModal
);
