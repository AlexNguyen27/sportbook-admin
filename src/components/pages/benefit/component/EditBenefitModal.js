import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { TextField } from "@material-ui/core";
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
import { updateBenefit } from "../../../../store/actions/benefit";

const EditBenefitModal = ({
  errors,
  clearErrors,
  modal,
  setModal,
  editedData,
  updateBenefit,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    description: editedData ? editedData.description : "",
    title: editedData ? editedData.title : "",
  });

  const { title, description } = formData;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initFormData = () => {
    setFormData({
      description: editedData ? editedData.description : "",
      title: editedData ? editedData.title : "",
    });
  }
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
    const { id } = editedData;
    const { title, description } = formData;
    updateBenefit(
      setLoading,
     {
      id,
      title,
      description,
     }
    );
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
        <ModalHeader toggle={() => closeModal()}>
          Edit benefit
        </ModalHeader>
        {/** MODAL BODY */}
        <Form onSubmit={(e) => onSubmit(e)}>
          <ModalBody>
            <Row>
              <Col xs="12">
                <TextField
                  id="outlined-multiline-flexible"
                  name="title"
                  label="Benefit title"
                  fullWidth
                  value={title}
                  onChange={onChange}
                  error={errors.title}
                />
              </Col>
              <Col xs="12" className="mt-4">
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  name="description"
                  fullWidth
                  value={description}
                  multiline
                  rows={4}
                  onChange={onChange}
                  variant="outlined"
                  error={errors.description}
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
export default connect(mapStateToProps, { clearErrors, updateBenefit })(
  EditBenefitModal
);
