import React, { useState } from "react";
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
import "firebase/auth";
import Swal from "sweetalert2";


const VerifyPhoneModal = ({
  errors,
  clearErrors,
  modal,
  setModal,
  onResend,
  phone,
  setValidatePhoneSuccess,
}) => {
  const dispatch = useDispatch();

  const [confirmPhoneCode, setConfirmPhoneCode] = useState("");

  // CLOSE MODAL ACTION
  const closeModal = () => {
    setModal(false);
    setConfirmPhoneCode("");
    dispatch({
      type: GET_ERRORS,
      errors: {
        confirmPhone: "",
        phone: "Invalid phone number!",
      },
    });
  };

  // Save on change input value
  const onChange = (e) => {
    setConfirmPhoneCode(e.target.value);
  };
  const handleValidatePhoneCode = (e) => {
    e.preventDefault();
    window.confirmationResult

      .confirm(confirmPhoneCode)
      .then(function (result) {
        // User signed in successfully.
        console.log("result=------------------", result);
        setValidatePhoneSuccess(true);
        if (errors.confirmPhone) {
          delete errors.confirmPhone;
        }
        clearErrors();
        setModal(false);
        Swal.fire({
          position: "center",
          type: "Warning",
          title: "Validated Successfully!, please save your work again!",
          showConfirmButton: true,
        });
      })
      .catch(function (error) {
        setValidatePhoneSuccess(false);
        dispatch({
          type: GET_ERRORS,
          errors: {
            confirmPhone: "Invalid verification code!, Please try again",
            phone: "Invalid phone number!",
          },
        });
        console.log("setValidatePhoneSuccess--------------", error);
      });
  };
  return (
    <Modal isOpen={modal} centered={true}>
      <ModalHeader toggle={() => closeModal()}>
        Varification phone number
      </ModalHeader>

      {/** MODAL BODY */}
      <Form onSubmit={(e) => handleValidatePhoneCode(e)}>
        <ModalBody>
          <Row>
            <Col xs="12">
              <TextFieldInputWithHeader
                id="outlined-multiline-flexible"
                name="confirmPhoneCode"
                label="Confirm phone code"
                fullWidth
                size="small"
                value={confirmPhoneCode}
                onChange={onChange}
                placeHolder="Enter confirmPhoneCode"
                error={errors.confirmPhone}
                variant="outlined"
              />
            </Col>
          </Row>
        </ModalBody>
        {/** MODAL FOOTER */}
        <ModalFooter>
          <Button
            variant="contained"
            color="primary"
            className="mr-2"
            size="small"
            type="submit"
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="default"
            size="small"
            onClick={() => onResend()}
          >
            Resend
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};
const mapStateToProps = (state) => ({
  errors: state.errors,
});
export default connect(mapStateToProps, {
  clearErrors,
})(VerifyPhoneModal);
