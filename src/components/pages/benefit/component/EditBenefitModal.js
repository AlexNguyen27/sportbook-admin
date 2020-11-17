import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";

import { TextField } from "@material-ui/core";
// COMPONENTS
import Button from "@material-ui/core/Button";
import { clearErrors, REPORT_STATUS_ARRAY } from "../../../../utils/common";
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
import PageLoader from "../../../custom/PageLoader";
import DropdownV2 from "../../../custom/DropdownV2";
import { updateReport } from "../../../../store/actions/report";

const EditBenefitModal = ({
  errors,
  clearErrors,
  modal,
  setModal,
  editedData,
  updateReport,
}) => {
    console.log('00000000000000000000', editedData);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    description: editedData ? editedData.description : "",
    title: editedData ? editedData.title : "",
  });

//   const [selectedStatusValue, setSelectedStatusValue] = useState(
//     editedData ? editedData.status : ""
//   );
  const { title, description } = formData;

  const initFormData = () => {
    setFormData({
      description: editedData ? editedData.description : "",
      title: editedData ? editedData.title : "",
    });
    // setSelectedStatusValue(editedData ? editedData.status : "");
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
    const { id } = editedData;
    const { title, description } = formData;
    // updateReport(
    //   setLoading,
    //   reportedBy,
    //   postId,
    //   description,
    // );
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
export default connect(mapStateToProps, { clearErrors, updateReport })(
  EditBenefitModal
);
