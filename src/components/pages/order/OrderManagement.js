import React, { useState, useEffect } from "react";
import moment from "moment";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DateFnsUtils from "@date-io/date-fns";
import { getOrders, getOrdersSchedule } from "../../../store/actions/order";
import SearchIcon from "@material-ui/icons/Search";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Row, Col } from "reactstrap";
import AddOrderModal from "./component/AddOrderModal";
import OrderList from "./component/OrderList";
import PageLoader from "../../custom/PageLoader";
import DropdownV2 from "../../custom/DropdownV2";
import Collapse from "@material-ui/core/Collapse";
import { getGroundsSchedule } from "../../../store/actions/ground";
import CustomTimeline from "./schedule/CustomTimeline";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "inline",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250,
  },
  btn: {
    marginBottom: "16px",
  },
}));

const ORDER_STATUS = {
  waiting_for_approve: "Waiting for approve",
  cancelled: "Cancelled",
  approved: "Approved",
  paid: "Paid",
  finished: "Finished",
};

const OrderManagement = ({
  getOrders,
  getOrdersSchedule,
  getGroundsSchedule,
}) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedToDate, setSelectedToDate] = React.useState(null);

  const [isSearch, setIsSearch] = useState(false);
  const [isToday, setIsToday] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scheduleLoading, setScheduleLoading] = useState(true);

  const [modelAdd, setModelAdd] = useState(false);

  useEffect(() => {
    getOrders(setLoading, { status: "all" });
    getGroundsSchedule(setScheduleLoading).then(() => {
      getOrdersSchedule(setScheduleLoading, {
        startDay: moment().format("DD/MM/YYYY"),
      });
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    getOrders(setLoading, {
      fromDate: selectedDate
        ? moment(selectedDate).startOf("days").format()
        : "",
      toDate: selectedToDate
        ? moment(selectedToDate).endOf("days").format()
        : "",
      status: orderStatus,
    });
  };

  const onShowToday = () => {
    setIsToday(!isToday);
    if (!isToday === true) {
      setSelectedDate(moment().startOf("days").format());
      setSelectedToDate(moment().endOf("days").format());
    }
  };

  const STATUS = { ...ORDER_STATUS, all: "All" };
  const [orderStatus, setOrderStatus] = useState("all");

  const orderStatusArr = Object.keys(STATUS).map((key) => ({
    key: key,
    value: STATUS[key],
  }));

  const [selectedCalendarDate, setSelectedCalendarDate] = React.useState(
    moment()
  );

  const handleDateChange = (date) => {
    setSelectedCalendarDate(date);
    setScheduleLoading(true);
    getOrdersSchedule(setScheduleLoading, {
      startDay: moment(date).format("DD/MM/YYYY"),
    });
  };


  return (
    <>
      <Row>
        <Col xs={4}>
          <Button
            className={classes.btn}
            onClick={() => setModelAdd(true)}
            variant="contained"
            color="primary"
          >
            <AddCircleIcon className="mr-2" /> Add new order
          </Button>
        </Col>
        <Col xs={8} className="text-right">
          <Button
            className={classes.btn}
            onClick={() => setIsSearch(!isSearch)}
            variant="contained"
            color="default"
          >
            <SearchIcon className="mr-2" /> Search
          </Button>
        </Col>
        <Col xs={12} className="text-center">
          <Collapse in={isSearch} timeout="auto" unmountOnExit>
            <hr />
            <form onSubmit={(e) => onSubmit(e)}>
              <Row style={{ justifyContent: "center" }}>
                <Button
                  className={[classes.btn, "mr-4"].join(" ")}
                  onClick={() => onShowToday()}
                  variant={"outlined"}
                  color="primary"
                >
                  Today
                </Button>
                <DropdownV2
                  className="mr-4"
                  width="200px"
                  label="Order status"
                  value={orderStatus.toString()}
                  size="small"
                  options={orderStatusArr || []}
                  valueBasedOnProperty="key"
                  displayProperty="value"
                  onChange={(key) => setOrderStatus(key)}
                  variant="outlined"
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    className="mt-0 mr-4"
                    variant="inline"
                    size="small"
                    format="dd/MM/yyyy 00:00:00"
                    margin="normal"
                    clearable
                    inputVariant="outlined"
                    id="date-picker-inline"
                    label="From date"
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    className="mt-0"
                    variant="inline"
                    size="small"
                    clearable
                    format="dd/MM/yyyy 23:59:59"
                    margin="normal"
                    minDate={selectedDate}
                    inputVariant="outlined"
                    id="date-picker-inline"
                    label="To date"
                    value={selectedToDate}
                    onChange={(date) => setSelectedToDate(date)}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Row>
              <Button
                className={classes.btn}
                type="submit"
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </form>
          </Collapse>
          <hr />
        </Col>
        <Col xs={12} className="">
          <PageLoader loading={loading}>
            <OrderList setLoading={setLoading} />
          </PageLoader>
        </Col>
      </Row>
      <Row className="mt-4 mb-4">
        <Col xs={12}>
          <hr />
          <h4>Order Scheduler</h4>
        </Col>
        <Col xs={12} className="text-center">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              className="mt-0"
              variant="inline"
              size="small"
              clearable
              format="dd/MM/yyyy 00:00:00"
              margin="normal"
              inputVariant="outlined"
              id="date-picker-inline"
              label="Date picker inline"
              value={selectedCalendarDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Col>
        <Col xs={12}>
          <PageLoader loading={scheduleLoading}>
            <CustomTimeline selectedDate={selectedCalendarDate} />
          </PageLoader>
        </Col>
      </Row>
      <AddOrderModal modal={modelAdd} setModal={setModelAdd} />
    </>
  );
};

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getGroundsSchedule,
  getOrders,
  getOrdersSchedule,
})(withRouter(OrderManagement));
