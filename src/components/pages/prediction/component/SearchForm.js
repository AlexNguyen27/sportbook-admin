import React from "react";
import { Row, Col, Form } from "reactstrap";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import moment from "moment";
import { getPredictionGround } from "../../../../store/actions/prediction";
import { connect } from "react-redux";

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 1,
    label: "1",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 10,
    label: "10",
  },
];

const amountMark = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 1,
    label: "1",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 7,
    label: "7",
  },
];
function valuetext(value) {
  return `${value}`;
}
const SearchForm = ({ setLoading, getPredictionGround }) => {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2020-10-11T21:11:54")
  );
  const [threshold, setThreshold] = React.useState(1);
  const [amount, setAmount] = React.useState(3);

  const handleChangeThreshold = (event, newValue) => {
    setThreshold(newValue);
  };

  const handleChangeAmount = (event, newValue) => {
    setAmount(newValue);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formatData = {
      from_date: moment(selectedDate).format("YYYY-MM-DD"),
      threshold_value: threshold,
      amount,
    };
    setLoading(true);
    getPredictionGround(setLoading, formatData);
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Row style={{ justifyContent: "center" }} className="mb-4">
        <Col xs={3}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              className="mt-0 w-100"
              id="date-picker-inline"
              label="Form Date"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Col>
        <Col xs={3}>
          <Typography id="discrete-slider-always" gutterBottom>
            Threshold
          </Typography>
          <Slider
            defaultValue={1}
            value={threshold}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-always"
            min={0}
            step={0.1}
            max={10}
            onChange={handleChangeThreshold}
            marks={marks}
            valueLabelDisplay="auto"
          />
        </Col>
        <Col xs={3}>
          <Typography id="discrete-slider-always" gutterBottom>
            Amount
          </Typography>
          <Slider
            defaultValue={1}
            value={amount}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-always"
            min={0}
            step={1}
            onChange={handleChangeAmount}
            max={7}
            marks={amountMark}
            valueLabelDisplay="auto"
          />
        </Col>
        <Col xs={"auto"} className="align-self-center">
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default connect(null, { getPredictionGround })(SearchForm);
