import React, { useState, useEffect } from "react";
import "date-fns";
import { connect } from "react-redux";
import MultipleSummary from "./MultipleSummary";
import DropdownV2 from "../../custom/DropdownV2";
import { Grid } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import ReportTable from "./ReportTable";
import { getGroundsByDate, getReports } from "../../../store/actions/statistic";
import { getBenefits } from "../../../store/actions/benefit";
import PageLoader from "../../custom/PageLoader";
import ExportCSV from "../../custom/ExportCSV";
import { Row, Col } from "reactstrap";
import { getAddress } from "../../../utils/commonFunction";

const Statistic = ({
  grounds,
  getGroundsByDate,
  getReports,
  reports,
  getBenefits,
  benefits,
}) => {
  const [selectedDropdownData, setSelectedDropdownData] = useState({
    selectedDateId: "7days",
  });
  const [loading, setLoading] = useState(true);
  const [reportLoading, setReportLoading] = useState(true);

  const [selectedStartDate, setSelectedStartDate] = React.useState(
    moment().startOf("month")
  );

  const [selectedEndDate, setSelectedEndDate] = React.useState(
    moment().endOf("month")
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSelectDisplayOption = (selectedDateId) => {
    setSelectedDropdownData({
      ...selectedDropdownData,
      selectedDateId,
    });
  };

  const { selectedDateId } = selectedDropdownData;

  useEffect(() => {
    setLoading(true);
    getBenefits(setLoading);
  }, []);

  useEffect(() => {
    setLoading(true);
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

  const orderTimes = Object.keys(grounds).map((key) => grounds[key].orderCount);

  useEffect(() => {
    setReportLoading(true);
    getReports(setReportLoading, selectedStartDate, selectedEndDate);
  }, [selectedStartDate, selectedEndDate]);

  const getBenefitNames = (benefit) => {
    const arr = benefit ? benefit.split(",") : [];
    const benefitName = arr
      .reduce(
        (acc, curr) =>
          benefits[curr] ? [...acc, benefits[curr]?.title] : [...acc],
        []
      )
      .join(", ");
    return benefitName || "No benefits";
  };
  const dataSource = Object.keys(reports).map((key) => ({
    ...reports[key],
    totalAmount: reports[key].totalAmount || 0,
    address: getAddress(reports[key].address),
    benefit: getBenefitNames(reports[key].benefit),
  }));

  return (
    <div className="mb-4">
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
          name={groundNames || []}
          // eslint-disable-next-line no-sparse-arrays
          dataSource={totalAmounts || []}
          lineName="Price(VND)"
          title="Base on Total Amount"
        />
      </PageLoader>
      <hr></hr>
      <PageLoader loading={loading}>
        <MultipleSummary
          name={groundNames || []}
          // eslint-disable-next-line no-sparse-arrays
          dataSource={orderTimes || []}
          lineName="Order Times"
          title="Base on Order Times"
        />
      </PageLoader>
      <hr className="m-4" />
      <h4>Customizable timed sales reports</h4>
      <Row className="mb-4">
        <Col xs={8}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              className="mr-4"
              variant="inline"
              format="dd/MM/yyyy 00:00:00"
              margin="normal"
              id="date-picker-inline"
              label="From date"
              value={selectedStartDate}
              onChange={(date) => setSelectedStartDate(date)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardDatePicker
              disableToolbar
              className="mr-4"
              variant="inline"
              format="dd/MM/yyyy 23:59:59"
              margin="normal"
              id="date-picker-inline"
              label="To date"
              minDate={selectedStartDate}
              value={selectedEndDate}
              onChange={(date) => setSelectedEndDate(date)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Col>
        <Col xs={4} className="text-right align-self-center">
          {/* EXPORT REPORTS */}
          <ExportCSV dataSource={dataSource} />
        </Col>
      </Row>

      <PageLoader loading={reportLoading}>
        <ReportTable dataSource={dataSource} />
      </PageLoader>
    </div>
  );
};

const mapStateToProps = (state) => ({
  grounds: state.statistic.grounds,
  reports: state.statistic.reports,
  benefits: state.benefit.benefits,
});
export default connect(mapStateToProps, {
  getGroundsByDate,
  getReports,
  getBenefits,
})(Statistic);
