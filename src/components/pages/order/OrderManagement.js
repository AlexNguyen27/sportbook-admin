import React, { useState } from "react";
import moment from "moment";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MyCalendar from "../../custom/MyCalendar";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Row, Col } from "reactstrap";
import AddOrderModal from "./component/AddOrderModal";
import OrderList from "./component/OrderList";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "inline",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250,
  },
}));

const OrderManagement = (props) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date(moment()));

  // const [loading, setLoading] = useState(false);
  const [modelAdd, setModelAdd] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <>
      <Row>
        <Col xs={3}>
          <Button
            className={classes.btn}
            onClick={() => setModelAdd(true)}
            variant="contained"
            color="primary"
          >
            <AddCircleIcon className="mr-2" /> Add new order
          </Button>
        </Col>
        <Col xs={12} className="mt-4">
          <OrderList modal={modelAdd} setModal={setModelAdd}/>
        </Col>
      </Row>
      <hr/>

      <Row className="mt-4 mb-4">
        <Col xs={12} className="text-center">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              format="MM/dd/yyyy"
              margin="normal"
              disablePast={true}
              inputVariant="outlined"
              id="date-picker-inline"
              label="Date picker inline"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Col>
        <Col xs={12} style={{ width: "100%" }}>
          <MyCalendar />
        </Col>
      </Row>
      <AddOrderModal modal={modelAdd} setModal={setModelAdd} />
    </>
  );
};

export default OrderManagement;
