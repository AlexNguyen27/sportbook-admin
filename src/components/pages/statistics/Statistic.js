import React, { useState, useEffect } from "react";
import "date-fns";
import { connect } from "react-redux";
import MultipleSummary from "./MultipleSummary";
import DropdownV2 from "../../custom/DropdownV2";
import { Grid } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import StatisticTable from "../../layout/StatictisTable";
import { getGrounds } from "../../../store/actions/ground";
import { getGroundsByDate } from "../../../store/actions/statistic";
import PageLoader from "../../custom/PageLoader";

const Statistic = ({ grounds, getGroundsByDate }) => {
  const [selectedDropdownData, setSelectedDropdownData] = useState({
    selectedDateId: "7days",
  });
  const [loading, setLoading] = useState(true);

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSelectDisplayOption = (selectedDateId) => {
    setSelectedDropdownData({
      ...selectedDropdownData,
      selectedDateId,
    });
  };

  const { selectedDateId } = selectedDropdownData;

  useEffect(() => {
    getGroundsByDate(setLoading, selectedDateId);
  }, [selectedDateId]);
  const displayOptions = [
    {
      name: "7 days ago",
      id: "7days",
    },
    {
      name: "A month ago",
      id: "aMonth",
    },
    {
      id: "6Months",
      name: "6 months ago",
    },
    {
      id: "aYear",
      name: "In a year",
    },
  ];

  const groundNames = Object.keys(grounds).map((key) => grounds[key].title);
  const totalAmounts = Object.keys(grounds).map(
    (key) => grounds[key].totalAmount
  );

  console.log(groundNames, totalAmounts);

  return (
    <div>
      <Grid item xs={4} className="mb-4">
        <DropdownV2
          fullWidth
          label="Select Chart Display Type"
          value={selectedDateId.toString()}
          options={displayOptions || []}
          valueBasedOnProperty="id"
          displayProperty="name"
          onChange={(index) => onSelectDisplayOption(index)}
          variant="outlined"
        />
      </Grid>
      <PageLoader loading={loading}>
        <MultipleSummary
          name={groundNames}
          // eslint-disable-next-line no-sparse-arrays
          dataSource={totalAmounts}
        />
      </PageLoader>
      <hr className="m-4" />
      <h4>Customizable timed sales reports</h4>
      <Grid item className="mb-4">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            className="mr-4"
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="From date"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardDatePicker
            disableToolbar
            className="mr-4"
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="To date"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <StatisticTable />
    </div>
  );
};

const mapStateToProps = (state) => ({
  grounds: state.statistic.grounds,
});
export default connect(mapStateToProps, { getGroundsByDate })(Statistic);
