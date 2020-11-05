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

const EditReportModal = ({
  errors,
  clearErrors,
  modal,
  setModal,
  reportData,
  updateReport,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    description: reportData ? reportData.description : "",
  });

  const [selectedStatusValue, setSelectedStatusValue] = useState(
    reportData ? reportData.status : ""
  );
  const { description } = formData;

  const initFormData = () => {
    setFormData({
      description: reportData ? reportData.description : "",
    });
    setSelectedStatusValue(reportData ? reportData.status : "");
  };
  useEffect(() => {
    initFormData();
  }, [reportData]);

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
    const { reportedBy, postId } = reportData;
    const { description } = formData;
    updateReport(
      setLoading,
      reportedBy,
      postId,
      description,
      selectedStatusValue
    );
  };

  // Save on change input value
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSelectReportStatus = (selectedReport) => {
    setSelectedStatusValue(selectedReport);
  };

  return (
    <Modal isOpen={modal} toggle={() => closeModal()} centered={true}>
      <PageLoader loading={loading} noPadding>
        <ModalHeader toggle={() => closeModal()}>
          Confirm report {reportData && reportData.post.title}
        </ModalHeader>
        {/** MODAL BODY */}
        <Form onSubmit={(e) => onSubmit(e)}>
          <ModalBody>
            <Row>
              <Col xs="12">
                <TextField
                  id="outlined-multiline-static"
                  label="Comment"
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
              <Col xs="12" className="mt-3">
                <DropdownV2
                  fullWidth
                  label="Status"
                  value={selectedStatusValue}
                  options={REPORT_STATUS_ARRAY}
                  valueBasedOnProperty="name"
                  displayProperty="value"
                  onChange={(categoryIndex) =>
                    onSelectReportStatus(categoryIndex)
                  }
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
  EditReportModal
);
