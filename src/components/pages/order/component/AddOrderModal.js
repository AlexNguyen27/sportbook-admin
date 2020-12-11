import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { clearErrors } from "../../../../store/actions/common";
import moment from "moment";
import _ from "lodash";
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
import { getSubGrounds } from "../../../../store/actions/subGround";
import DropdownV2 from "../../../custom/DropdownV2";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { PAYMENT_TYPE } from "../../../../utils/common";
import { trimObjProperties } from "../../../../utils/formatString";
import { getPrices } from "../../../../store/actions/price";
import { addOrder } from "../../../../store/actions/order";
import { isSameOrAfterNow } from "../../../../utils/commonFunction";
import { getGrounds } from "../../../../store/actions/ground";

const AddOrderModal = ({
  errors,
  clearErrors,
  modal,
  setModal,
  getSubGrounds,
  subGrounds,
  getPrices,
  prices,
  addOrder,
  getGrounds,
  grounds,
}) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const subGroundArr = Object.keys(subGrounds).map(
    (subGroundId) => subGrounds[subGroundId]
  );
  const [selectedSubGroundId, setSelectedSubGroundId] = useState(
    subGroundArr[0]?.id || ""
  );

  const groundArr = Object.keys(grounds).map((ground) => grounds[ground]);
  const [selectedGroundId, setSelectedGroundId] = useState(
    groundArr[0]?.id || ""
  );

  useEffect(() => {
    getGrounds(setLoading);
  }, []);

  useEffect(() => {
    if (selectedGroundId) {
      getSubGrounds(setLoading, selectedGroundId);
    }
  }, [selectedGroundId, setSelectedGroundId]);

  useEffect(() => {
    if (selectedSubGroundId) {
      getPrices(setLoading, selectedSubGroundId);
    }
  }, [setSelectedSubGroundId, selectedSubGroundId]);

  const [formData, setFormData] = useState({
    price: "",
    discount: "",
  });

  // ONLY SHOW START TIME AFTER NOW
  const startTimeArr = () => {
    const startTimes = [];
    Object.keys(prices).map((key) => {
      if (
        !startTimes.find((item) => item.compare === prices[key].startTime) &&
        isSameOrAfterNow(
          prices[key].startTime,
          moment(selectedDate.date).format("DD-MM-YYYY")
        )
      ) {
        startTimes.push({
          compare: prices[key].startTime,
          startTime: moment(prices[key].startTime, "HH:mm:ss").format("HH:mm"),
          displayValue: moment(prices[key].startTime, "HH:mm:ss").format(
            "hh:mm A"
          ),
        });
      }
    });
    return startTimes;
  };

  const [selectedDate, setSelectedDate] = React.useState({
    date: new Date(),
    startTime: startTimeArr[0]?.id || "",
    selectedPriceId: "",
  });

  const paymendTypeArr = Object.keys(PAYMENT_TYPE).map((key) => ({
    key: key,
    value: PAYMENT_TYPE[key],
  }));

  const [selectedPaymentType, setSelectedPaymentType] = useState("");

  const getEndTimes = (startTime = "") => {
    let selectedStartTime = startTime || selectedDate.startTime;
    let endTimes = [];
    if (!selectedStartTime.trim()) {
      return endTimes;
    }

    const endTimeArray = _.map(prices, (price) => {
      const newEndTime = {
        priceId: price.id,
        startTime: moment(price.startTime, "HH:mm:ss").format("HH:mm"),
        displayValue: moment(price.endTime, "HH:mm:ss").format("hh:mm A"),
      };
      return newEndTime;
    });

    endTimes = _.filter(endTimeArray, ["startTime", selectedStartTime]);
    return endTimes;
  };

  const { price, discount } = formData;
  // CLOSE MODAL ACTION
  const closeModal = () => {
    setModal(false);
    clearErrors();
    setFormData({
      price: "",
      discount: "",
    });
    setSelectedPaymentType("");
    setSelectedDate({
      date: new Date(),
      startTime: startTimeArr[0]?.id || "",
      selectedPriceId: "",
    });
  };
  const handleDateChange = (date, fieldName) => {
    setSelectedDate({
      ...selectedDate,
      [fieldName]: date,
    });
  };

  const handleStartTimeChange = (date) => {
    const entimeArr = getEndTimes(date);
    if (entimeArr.length === 1) {
      setSelectedDate({
        ...selectedDate,
        startTime: date,
        selectedPriceId: entimeArr[0].priceId,
      });
      setFormData({
        price: prices[entimeArr[0].priceId].price,
        discount: prices[entimeArr[0].priceId].discount.toString(),
      });
    } else {
      setSelectedDate({
        ...selectedDate,
        startTime: date,
      });
    }
  };

  const handleEndTimeChange = (priceId) => {
    setFormData({
      price: prices[priceId].price,
      discount: prices[priceId].discount.toString(),
    });
    setSelectedDate({
      ...selectedDate,
      selectedPriceId: priceId,
    });
  };
  // HANDLE ON SUBMIT FROM ADD NEW GROUP
  const onSubmit = (e) => {
    e.preventDefault();

    const error = {};
    const formatedData = trimObjProperties({
      subGroundId: selectedSubGroundId,
      startDay: moment(selectedDate.date).format("DD/MM/YYYY"),
      startTime: prices[selectedDate.selectedPriceId]?.startTime || "",
      endTime: prices[selectedDate.selectedPriceId]?.endTime || "",
      paymentType: selectedPaymentType,
    });

    Object.keys(formatedData).map((key) => {
      if (!formatedData[key]) {
        error[key] = "This field is required";
      }
    });
    if (!selectedPaymentType.trim()) {
      error.payment = "This field is required";
    }

    dispatch({
      type: GET_ERRORS,
      errors: error,
    });

    if (JSON.stringify(error) === "{}") {
      formatedData.price = price;
      formatedData.discount = Number(discount);
      setLoading(true);
      addOrder(setLoading, formatedData);
    }
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
                  label="Select Ground Name"
                  value={selectedGroundId.toString() || ""}
                  options={groundArr || []}
                  valueBasedOnProperty="id"
                  displayProperty="title"
                  onChange={(id) => {
                    setSelectedGroundId(id);
                  }}
                  error={errors.groundId}
                  variant="outlined"
                />
              </Col>
              <Col xs="12" className="mt-4">
                <DropdownV2
                  fullWidth
                  label="Select Sub Ground Name"
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
                    disablePast={true}
                    inputVariant="outlined"
                    format="dd/MM/yyyy"
                    style={{ width: "100%", marginTop: 0 }}
                    value={selectedDate.date}
                    onChange={(date) => handleDateChange(date, "date")}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    error={errors.startDay}
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
                  options={startTimeArr() || []}
                  valueBasedOnProperty="startTime"
                  displayProperty="displayValue"
                  onChange={(time) => handleStartTimeChange(time)}
                  error={errors.startTime}
                  variant="outlined"
                />
              </Col>
              <Col xs="6" className="mt-4">
                <DropdownV2
                  fullWidth
                  label="Select end time"
                  value={selectedDate.selectedPriceId.toString() || ""}
                  options={getEndTimes() || []}
                  valueBasedOnProperty="priceId"
                  displayProperty="displayValue"
                  onChange={(priceId) => handleEndTimeChange(priceId)}
                  error={errors.endTime}
                  variant="outlined"
                />
              </Col>
              <Col xs="6" className="mt-4">
                <TextFieldInputWithHeader
                  disabled
                  type="number"
                  variant="outlined"
                  name="price"
                  label="Price"
                  fullWidth
                  value={price || 0}
                />
              </Col>
              <Col xs="6" className="mt-4">
                <TextFieldInputWithHeader
                  disabled
                  type="number"
                  variant="outlined"
                  name="discount"
                  label="Discount"
                  fullWidth
                  value={discount || 0}
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
  grounds: state.ground.grounds,
});
export default connect(mapStateToProps, {
  clearErrors,
  addOrder,
  getPrices,
  getSubGrounds,
  getGrounds,
})(AddOrderModal);
