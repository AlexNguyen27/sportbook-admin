import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Row, Col } from "reactstrap";
import { Button } from "@material-ui/core";
import UserInfoCard from "./component/UserInfoCard";
import OrderHistoryTable from "./component/OrderHistoryTable";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useHistory } from "react-router-dom";
import GroundDetailCard from "./component/GroundDetailCard";
import { useState } from "react";
import PageLoader from "../../../../custom/PageLoader";
import { connect } from "react-redux";
import moment from "moment";
import { getOrderById } from "../../../../../store/actions/order";
import { getBenefits } from "../../../../../store/actions/benefit";

const useStyles = makeStyles({
  top: {
    // padding: "100px 0 40px 0",
  },
});

const OrderDetail = ({
  match,
  orderDetail = {},
  benefits,
  orderId,
  getOrderById,
  getBenefits,
}) => {
  const classes = useStyles();
  const history = useHistory();

  // const orderId = match.params.id;
  const [loading, setLoading] = useState(true);
  console.log("ad------------------", orderId);
  useEffect(() => {
    if (orderId) {
      getOrderById(setLoading, orderId).then(() => {
        setLoading(true);
        getBenefits(setLoading);
      });
    }
  }, []);

  const { createdAt } = orderDetail;

  return (
    <PageLoader loading={loading}>
      <Row className={classes.top} style={{ justifyContent: "center" }}>
        <Col xs={12} className="text-left" style={{ marginBottom: "30px" }}>
          <Button
            variant="contained"
            size="small"
            color="default"
            className={classes.btn}
            startIcon={<ArrowBackIosIcon />}
            onClick={() => history.goBack()}
          >
            Go Back
          </Button>
        </Col>
        <Col xs={12}>
          <Row>
            <Col xs={6}>
              <h6>
                Created on:{" "}
                {moment(createdAt).format("dddd DD/MM/YYYY HH:mm A")}
              </h6>
            </Col>
            <Col xs={6} className="text-center">
              <h4>Ground Information</h4>
            </Col>
          </Row>
        </Col>

        <Col xs={6}>
          <UserInfoCard orderDetail={orderDetail} />
          <h5 className="mt-4">Order histories</h5>
          <OrderHistoryTable orderDetail={orderDetail} />
        </Col>
        <Col xs={6}>
          <GroundDetailCard orderDetail={orderDetail} benefits={benefits} />
        </Col>
      </Row>
    </PageLoader>
  );
};

const mapStateToProps = (state) => ({
  orderDetail: state.order.selected_order,
  benefits: state.benefit.benefits,
});

export default connect(mapStateToProps, { getOrderById, getBenefits })(
  OrderDetail
);
