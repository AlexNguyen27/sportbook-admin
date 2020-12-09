import React from "react";
import { Row, Col } from "reactstrap";
import PolarChart from "./component/PolarChart";
import PredictionTable from "./component/PredictionTable";
import GroupedBarChart from "./component/GroupedBarChart";

// 2 CIRCLE CHARTS
// A TABLE
// A 2 COLUMN CHAR AND A TABLE
const Prediction = () => {
  return (
    <>
      <h4 className="mb-4">Ground: San Chao Lua</h4>
      <Row>
        <Col xs={6}>
          <h5>Total amount on hour</h5>
          <PolarChart />
        </Col>
        <Col xs={6}>
          <h5>Total amount on day</h5>

          <PolarChart />
        </Col>
        <Col xs={12}>
          <hr />
          <h5>Real data</h5>

          <PredictionTable />
          <hr />
        </Col>
        <Col xs={12}>
          {[...Array(7)].map((item) => (
            <Row>
              <Col xs={6}>
                <h5>Day: 12-10-2020</h5>
                <GroupedBarChart />
              </Col>

              <Col xs={6} className="align-self-center">
                <PredictionTable size={"small"} />
              </Col>
              <Col xs={12}>
                <hr />
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default Prediction;
