import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { clearErrors } from "../../../../store/actions/common";
import moment from "moment";
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
import { addBenefit } from "../../../../store/actions/benefit";
import { getSubGrounds } from "../../../../store/actions/subGround";
import DropdownV2 from "../../../custom/DropdownV2";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import { PAYMENT_TYPE } from "../../../../utils/common";
import { trimObjProperties } from "../../../../utils/formatString";
import { getPrices } from "../../../../store/actions/price";

const AddOrderModal = ({
  errors,
  clearErrors,
  modal,
  setModal,
  addBenefit,
  getSubGrounds,
  subGrounds,
  getPrices,
  prices,
}) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const subGroundArr = Object.keys(subGrounds).map(
    (subGroundId) => subGrounds[subGroundId]
  );
  const [selectedSubGroundId, setSelectedSubGroundId] = useState(
    subGroundArr[0]?.id || ""
  );
  useEffect(() => {
    getSubGrounds(setLoading).then(() => {
      setLoading(true);
      getPrices(setLoading, selectedSubGroundId);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    getPrices(setLoading, selectedSubGroundId);
  }, [setSelectedSubGroundId, selectedSubGroundId]);

  const [formData, setFormData] = useState({
    price: "",
    discount: "",
  });

  const startTimeArr = Object.keys(prices).map((key) => ({
    startTime: moment(prices[key].startTime, "HH:mm:ss").format("HH:mm"),
    displayValue: moment(prices[key].startTime, "HH:mm:ss").format("HH:mm A"),
  }));

  const endTimeArr = Object.keys(prices).map((key) => ({
    endTime: moment(prices[key].endTime, "HH:mm:ss").format("HH:mm"),
    displayValue: moment(prices[key].endTime, "HH:mm:ss").format("HH:mm A"),
  }));

  const [selectedDate, setSelectedDate] = React.useState({
    date: new Date(),
    startTime: startTimeArr[0]?.id || "",
    endTime: endTimeArr[0]?.id || "",
  });

  const paymendTypeArr = Object.keys(PAYMENT_TYPE).map((key) => ({
    key: key,
    value: PAYMENT_TYPE[key],
  }));

  console.log("------sdf---------", startTimeArr);
  const [selectedPaymentType, setSelectedPaymentType] = useState("");

  const { price, discount } = formData;
  // CLOSE MODAL ACTION
  const closeModal = () => {
    setModal(false);
    clearErrors();
    setFormData({
      price: "",
      discount: "",
    });
  };
  const handleDateChange = (date, fieldName) => {
    console.log("d-------------", date);
    setSelectedDate({
      ...selectedDate,
      [fieldName]: date,
    });
  };

  const handleStartTimeChange = (date) => {
    setSelectedDate({
      ...selectedDate,
      startTime: date,
    });
  };

  const handleEndTimeChange = (date) => {
    setSelectedDate({
      ...selectedDate,
      endTime: date,
    });
  };
  // HANDLE ON SUBMIT FROM ADD NEW GROUP
  const onSubmit = (e) => {
    e.preventDefault();

    const error = {};
    const formatedData = {
      subGroundId: selectedSubGroundId,
      startDay: moment(selectedDate.date).format("DD/MM/YYYY"),
      startTime: moment(selectedDate.startTime).format("HH:mm"),
      endTime: moment(selectedDate.endTime).format("HH:mm"),
      paymentType: selectedPaymentType,
    };
    console.log("d----------------", formatedData);

    // Object.keys(formData).map((key) => {
    // if (formData.title.trim() === "") {
    //   error.title = "This field is required";
    // }
    // });
    if (!selectedPaymentType.trim()) {
      error.payment = "This field is required";
    }

    dispatch({
      type: GET_ERRORS,
      errors: error,
    });

    if (JSON.stringify(error) === "{}") {
      // setLoading(true);
      formatedData.price = price;
      formatedData.discount = discount;
      console.log(formatedData);
      //   addBenefit(
      //     setLoading,
      //     title,
      //     description,
      //   );
    }
  };

  // Save on change input value
  const onChange = (e) => {
    // setFormData({
    //   ...formData,
    //   [e.target.name]: e.target.value,
    // });
  };

  return (
    <Modal
      style={{ maxWidth: "700px", marginTop: "100px" }}
      isOpen={modal}
      toggle={() => closeModal()}
    >
      <PageLoader loading={loading} noPadding>
        <ModalHeader toggle={() => closeModal()}>Add New Order</ModalHeader>

        {/** MODAL BODY */}
        <Form onSubmit={(e) => onSubmit(e)}>
          <ModalBody>
            <Row>
              <Col xs="12">
                <DropdownV2
                  fullWidth
                  label="Select a sub ground"
                  value={selectedSubGroundId.toString() || ""}
                  options={subGroundArr || []}
                  valueBasedOnProperty="id"
                  displayProperty="name"
                  onChange={(id) => setSelectedSubGroundId(id)}
                  error={errors.subGroundId}
                  variant="outlined"
                />
              </Col>
              <Col xs="6" className="mt-4">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    variant="outlined"
                    id="date-picker-dialog"
                    label="Select date"
                    format="MM/dd/yyyy"
                    value={selectedDate.date}
                    onChange={(date) => handleDateChange(date, "date")}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Col>
              <Col xs="6" className="mt-4">
                <DropdownV2
                  fullWidth
                  label="Select payment type"
                  value={selectedPaymentType.toString() || ""}
                  options={paymendTypeArr || []}
                  valueBasedOnProperty="key"
                  displayProperty="value"
                  onChange={(key) => setSelectedPaymentType(key)}
                  error={errors.payment}
                  variant="outlined"
                />
              </Col>
              <Col xs="6" className="mt-4">
                <DropdownV2
                  fullWidth
                  label="Select start time"
                  value={selectedDate.startTime.toString() || ""}
                  options={startTimeArr || []}
                  valueBasedOnProperty="startTime"
                  displayProperty="displayValue"
                  onChange={(time) => handleStartTimeChange(time)}
                  error={errors.payment}
                  variant="outlined"
                />
                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Select start time"
                    value={selectedDate.startTime}
                    onChange={(date) => handleDateChange(date, "startTime")}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                </MuiPickersUtilsProvider> */}
              </Col>
              <Col xs="6" className="mt-4">
                <DropdownV2
                  fullWidth
                  label="Select start time"
                  value={selectedDate.endTime.toString() || ""}
                  options={endTimeArr || []}
                  valueBasedOnProperty="endTime"
                  displayProperty="displayValue"
                  onChange={(time) => handleEndTimeChange(time)}
                  error={errors.payment}
                  variant="outlined"
                />
                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Select end time"
                    value={selectedDate.endTime}
                    onChange={(date) => handleDateChange(date, "endTime")}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                </MuiPickersUtilsProvider> */}
              </Col>

              <Col xs="6" className="mt-4">
                <TextFieldInputWithHeader
                  disabled
                  variant="outlined"
                  name="price"
                  label="Price"
                  fullWidth
                  value={price || ""}
                  onChange={onChange}
                />
              </Col>
              <Col xs="6" className="mt-4">
                <TextFieldInputWithHeader
                  disabled
                  variant="outlined"
                  name="discount"
                  label="Discount"
                  fullWidth
                  value={discount || ""}
                  onChange={onChange}
                />
              </Col>
            </Row>
          </ModalBody>
          {/** MODAL FOOTER */}
          <ModalFooter>
            <Button variant="contained" color="primary" type="submit">
              Add
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
  subGrounds: state.subGround.subGrounds,
  prices: state.price.prices,
});
export default connect(mapStateToProps, {
  clearErrors,
  addBenefit,
  getPrices,
  getSubGrounds,
})(AddOrderModal);
