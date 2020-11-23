import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// COMPONENTS
import Button from "@material-ui/core/Button";
import { clearErrors } from "../../../../utils/common";

import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";
import PageLoader from "../../../custom/PageLoader";
import TextFieldInput from "../../../custom/TextFieldInputWithheader";
import { updateSubGround } from "../../../../store/actions/subGround";

const EditSubGroundModal = ({
  errors,
  clearErrors,
  modal,
  setModal,
  editedData,
  updateSubGround,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    numberOfPlayers: "",
  });

  const { numberOfPlayers, name } = formData;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initFormData = () => {
    setFormData({
      name: editedData ? editedData.name : "",
      numberOfPlayers: editedData ? editedData.numberOfPlayers : "",
    });
  };
  useEffect(() => {
    initFormData();
  }, [editedData]);

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
    const error = {};
    const { id } = editedData;
      if (!formData.name.trim()) {
        error.name = "This field is required";
      }
    updateSubGround(setLoading, {
      id,
      name,
      numberOfPlayers,
      groundId: editedData.groundId,
    });
  };

  // Save on change input value
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal isOpen={modal} toggle={() => closeModal()} centered={true}>
      <PageLoader loading={loading} noPadding>
        <ModalHeader toggle={() => closeModal()}>Edit benefit</ModalHeader>
        {/** MODAL BODY */}
        <Form onSubmit={(e) => onSubmit(e)}>
          <ModalBody>
            <Row>
              <Col xs="12">
                <TextFieldInput
                  required
                  variant="outlined"
                  name="name"
                  label="Subground name"
                  fullWidth
                  value={name || ''}
                  onChange={onChange}
                  error={errors.name}
                />
              </Col>
              <Col xs="12" className="mt-4">
                <TextFieldInput
                  required
                  name="numberOfPlayers"
                  label="Number of players"
                  fullWidth
                  variant="outlined"
                  type="number"
                  value={numberOfPlayers || 2}
                  onChange={onChange}
                  InputProps={{
                    shrink: true,
                    inputProps: {
                      min: 2,
                    },
                  }}
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
export default connect(mapStateToProps, { clearErrors, updateSubGround })(
  EditSubGroundModal
);
