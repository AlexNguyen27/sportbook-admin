import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import PolarChart from "./component/PolarChart";
import PredictionTable from "./component/PredictionTable";
import GroupedBarChart from "./component/GroupedBarChart";
import SearchForm from "./component/SearchForm";
import PageLoader from "../../custom/PageLoader";
import {
  getPredictionGround,
  getDescribe,
} from "../../../store/actions/prediction";
import { connect } from "react-redux";
import moment from "moment";
import { startTimes } from "../../../mockup/prediction";
import SideTable from "./component/SideTable";

// 2 CIRCLE CHARTS
// A TABLE
// A 2 COLUMN CHAR AND A TABLE
const Prediction = ({ getPredictionGround, predictions = [], getDescribe }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const defaultData = {
      from_date: "2020-10-11",
      threshold_value: 1,
      amount: 3,
    };
    getPredictionGround(setLoading, defaultData).then(() => {
      setLoading(true);
      getDescribe(setLoading);
    });
  }, []);

  const dayLabels = predictions.map((item) => item.datetime);
  const totalAmoutData = [...Array(8)].reduce((acc, curr, index) => {
    const sum = predictions.reduce(
      (old, item) => old + item.prediction_data[index],
      0
    );
    return [...acc, Math.round(sum)];
  }, []);

  console.log(totalAmoutData);

  return (
    <>
      <h4 className="mb-4">Ground: San Chao Lua</h4>
      <SearchForm setLoading={setLoading} />
      <PageLoader loading={loading}>
        <Row>
          <Col xs={6}>
            <h5>Total amount on hour</h5>
            <PolarChart labels={startTimes} dataSource={totalAmoutData} />
          </Col>
          <Col xs={6}>
            <h5>Total amount on day</h5>

            <PolarChart labels={dayLabels} dataSource={totalAmoutData} />
          </Col>
          <Col xs={12}>
            <hr />
            <h5>Real data</h5>

            <PredictionTable />
            <hr />
          </Col>
          <Col xs={12}>
            {predictions.map((item) => (
              <Row>
                <Col xs={6}>
                  <h5>
                    Day:{" "}
                    {moment(item.datetime, "YYYY-MM-DD").format("DD-MM-YYYY")}
                  </h5>
                  <GroupedBarChart labels={startTimes} dataSource={item} />
                </Col>

                <Col xs={6} className="align-self-center">
                  <SideTable size={"small"} labels={startTimes} dataSource={item}/>
                </Col>
                <Col xs={12}>
                  <hr />
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
      </PageLoader>
    </>
  );
};

const mapStateToProps = (state) => ({
  predictions: state.prediction.prediction.prediction_data,
});

export default connect(mapStateToProps, { getPredictionGround, getDescribe })(
  Prediction
);
