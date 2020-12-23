import React from "react";
import { Paper } from "@material-ui/core";
import { Row, Col } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import {
  getFullname,
  getUserAddress,
} from "../../../../../../utils/commonFunction";
import { PAYMENT_TYPE, ORDER_STATUS } from "../../../../../../utils/common";

const useStyles = makeStyles({
  upperCase: {
    textTransform: "uppercase",
    marginBottom: "4px",
    fontWeight: "bold",
  },
  pTag: {
    fontSize: "14px",
    marginBottom: "6px",
  },
});
const UserInfoCard = ({ orderDetail }) => {
  const classes = useStyles();
  const { firstName = "", lastName = "", email, phone, address } =
    orderDetail.user || {};
  const { paymentType } = orderDetail;

  return (
    <Paper elevation={3} className="p-4">
      <Row>
        <Col xs={12} className="align-self-center">
          <h5 className={classes.upperCase}>
            {getFullname(firstName, lastName)}
          </h5>
          <p className={classes.pTag}>
            <span className="font-weight-bold">Email: </span>
            <span> {email}</span>
          </p>
          <p className={classes.pTag}>
            <span className="font-weight-bold">Phone: </span>
            <span>
              {" "}
              <a href={`tel:${phone}`} alt="">
                {phone || "No phone"}
              </a>
            </span>
          </p>
          <p className={classes.pTag}>
            <span className="font-weight-bold">Address: </span>
            <span>{getUserAddress(address)}</span>
          </p>
        </Col>

        <Col xs={12}>
          <hr />
          <h6 className="font-weight-bold">
            Payment method: {PAYMENT_TYPE[paymentType]}{" "}
          </h6>
          <span>
            {paymentType === "online"
              ? `(Wait for confirmation from the owner and cannot be guaranteed by
              Love Sport if any dispute arises)`
              : `Guaranteed by Love Sport when any dispute occurs. A 100% refund
              will be issued for cancelations made before the scheduled time.`}
          </span>
          <hr />
        </Col>
        <Col xs={12}>
          <h6 className="font-weight-bold">
            Order status: {ORDER_STATUS[orderDetail.status]}
          </h6>
        </Col>
      </Row>
    </Paper>
  );
};

export default UserInfoCard;
