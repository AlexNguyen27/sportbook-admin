import React, { useEffect, useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ORDER_STATUS } from "../../../utils/common";
import { Row, Col } from "reactstrap";
import PageLoader from "../../custom/PageLoader";
import { getOrders, updateOrderStatus } from "../../../store/actions/order";
import DropdownV2 from "../../custom/DropdownV2";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import SearchIcon from "@material-ui/icons/Search";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Collapse from "@material-ui/core/Collapse";
import TableListOrders from "./TableListOrders";

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

const STATUS = { ...ORDER_STATUS, all: "All" };
const orderStatusArr = Object.keys(STATUS).map((key) => ({
  key: key,
  value: STATUS[key],
}));

const OrdersList = ({ getOrders, orders }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders(setLoading, { status: "all" });
  }, []);

  const [orderStatus, setOrderStatus] = useState("all");

  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedToDate, setSelectedToDate] = React.useState(null);

  const [isSearch, setIsSearch] = useState(false);
  const [isToday, setIsToday] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // getOrders()
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

  return (
    <>
      <Row>
        <Col xs={12} className="text-right">
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
                    clearable={true}
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
                    clearable={true}
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
      </Row>

      <PageLoader loading={loading}>
        <div style={{ maxWidth: `100%`, overflowX: "auto" }}>
          <TableListOrders setLoading={setLoading} />
        </div>
      </PageLoader>
    </>
  );
};
const mapStateToProps = (state) => ({
  orders: state.order.orders,
  auth: state.auth,
});
export default connect(mapStateToProps, { getOrders, updateOrderStatus })(
  withRouter(OrdersList)
);
