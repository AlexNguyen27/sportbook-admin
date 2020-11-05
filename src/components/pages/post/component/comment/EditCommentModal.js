import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";

import { TextField } from "@material-ui/core";
// COMPONENTS
import Button from "@material-ui/core/Button";
import { clearErrors } from "../../../../../utils/common";

import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";
import { updateComment } from "../../../../../store/actions/comment";
import { GET_ERRORS } from "../../../../../store/actions/types";
import PageLoader from "../../../../custom/PageLoader";

const EditCommentModal = ({
  errors,
  clearErrors,
  modal,
  setModal,
  commentData = {},
  updateComment,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState(
    commentData ? commentData.comment : ""
  );
  const initFormData = () => {
    setComment(commentData ? commentData.comment : "");
  };
  useEffect(() => {
    initFormData();
  }, [commentData]);

  // CLOSE MODAL ACTION
  const closeModal = () => {
    setModal(false);
    clearErrors();
    initFormData();
  };

  // HANDLE ON SUBMIT FROM ADD NEW GROUP
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let error = {};
    if (comment.trim() === "") {
      error.comment = "Enter your comment!";
      dispatch({
        type: GET_ERRORS,
        errors: error,
      });
    } else {
      updateComment(setLoading, commentData.id, comment);
    }
  };

  // Save on change input value
  const onChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <Modal isOpen={modal} toggle={() => closeModal()} centered={true}>
      <PageLoader loading={loading} noPadding>
        <ModalHeader toggle={() => closeModal()}>Edit your comment</ModalHeader>
        {/** MODAL BODY */}
        <Form onSubmit={(e) => onSubmit(e)}>
          <ModalBody>
            <Row>
              <Col xs="12">
                <TextField
                  id="outlined-multiline-static"
                  label="Comment"
                  name="comment"
                  fullWidth
                  value={comment}
                  multiline
                  rows={4}
                  onChange={onChange}
                  variant="outlined"
                  error={errors.comment}
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
  errors: state.errors,
});
export default connect(mapStateToProps, { clearErrors, updateComment })(
  EditCommentModal
);
