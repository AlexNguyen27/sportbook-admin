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
import PageLoader from "../../../custom/PageLoader";
import { addReport } from "../../../../store/actions/report";

const ReportModal = ({
  auth: { user },
  postId,
  clearErrors,
  errors,
  modal,
  addReport,
  setModal,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");

  // Save on change input value
  const onChange = (e) => {
    setReason(e.target.value);
  };
  // CLOSE MODAL ACTION
  const closeModal = () => {
    setModal(false);
    clearErrors();
    setReason("");
  };

  // HANDLE ON SUBMIT FROM ADD NEW GROUP
  const onSubmit = (e) => {
    e.preventDefault();

    let error = {};
    if (reason.trim() === "") {
      error.reason = "This field is required!";
    }

    dispatch({
      type: GET_ERRORS,
      errors: error,
    });

    if (JSON.stringify(error) === "{}") {
      setLoading(true);
      addReport(setLoading, user.id, postId, reason);
    }
  };

  return (
    <Modal isOpen={modal} toggle={() => closeModal()} centered={true}>
      <PageLoader loading={loading} noPadding>
        <ModalHeader toggle={() => closeModal()}>Report the post</ModalHeader>
        {/** MODAL BODY */}
        <Form onSubmit={(e) => onSubmit(e)}>
          <ModalBody>
            <Row>
              <Col xs="12">
                <TextFieldInputWithHeader
                  id="outlined-multiline-flexible"
                  name="reason"
                  label="Enter reason you report this post"
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  value={reason}
                  onChange={onChange}
                  error={errors.reason}
                />
              </Col>
            </Row>
          </ModalBody>

          {/** MODAL FOOTER */}
          <ModalFooter>
            <Button variant="contained" color="primary" type="submit">
              Submit
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

export default connect(mapStateToProps, { clearErrors, addReport })(
  ReportModal
);
