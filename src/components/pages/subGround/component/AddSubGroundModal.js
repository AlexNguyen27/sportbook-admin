import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
// COMPONENTS
import Button from "@material-ui/core/Button";
import { clearErrors, GROUND_STATUS_DISPLAY } from "../../../../utils/common";

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
import { addSubGround } from "../../../../store/actions/subGround";
import { trimObjProperties } from "../../../../utils/formatString";
import { GET_ERRORS } from "../../../../store/actions/types";
import DropdownV2 from "../../../custom/DropdownV2";

const AddSubGroundModal = ({
  errors,
  clearErrors,
  modal,
  setModal,
  selectedGroundId,
  addSubGround,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    numberOfPlayers: "",
  });

  const statusArr = Object.keys(GROUND_STATUS_DISPLAY).map((key) => ({
    key: key,
    value: GROUND_STATUS_DISPLAY[key],
  }));
  const [selectedStatus, setSelectedStatus] = useState("");

  const { numberOfPlayers, name } = formData;

  // CLOSE MODAL ACTION
  const closeModal = () => {
    setModal(false);
    clearErrors();
    setFormData({
      name: "",
      numberOfPlayers: "",
    });
  };

  // HANDLE ON SUBMIT FROM ADD NEW GROUP
  const onSubmit = (e) => {
    e.preventDefault();
    const error = {};

    const formatedData = trimObjProperties({
      ...formData,
      groundId: selectedGroundId,
    });

    console.log("here---------------", formatedData);
    Object.keys(formatedData).map((key) => {
      if (!formatedData[key]) {
        error[key] = "This field is required";
      }
    });
    if (!selectedStatus.trim()) {
      error.status = "This field is required";
    }

    dispatch({
      type: GET_ERRORS,
      errors: error,
    });

    if (JSON.stringify(error) === "{}") {
      formatedData.numberOfPlayers = Number(formData.numberOfPlayers);
      formatedData.status = selectedStatus;
      setLoading(true);
      addSubGround(setLoading, formatedData);
    }
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
          Add new sub ground
        </ModalHeader>
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
                  value={name || ""}
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
                  value={numberOfPlayers}
                  onChange={onChange}
                  error={errors.numberOfPlayers}
                />
              </Col>
              <Col xs="12" className="mt-4">
                <DropdownV2
                  fullWidth
                  label="Status"
                  value={selectedStatus.toString() || ""}
                  options={statusArr || []}
                  valueBasedOnProperty="key"
                  displayProperty="value"
                  onChange={(id) => setSelectedStatus(id)}
                  error={errors.status}
                  variant="outlined"
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
export default connect(mapStateToProps, { clearErrors, addSubGround })(
  AddSubGroundModal
);
