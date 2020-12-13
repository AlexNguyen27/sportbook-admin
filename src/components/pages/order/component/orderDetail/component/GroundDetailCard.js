import React from "react";
import { Row, Col } from "reactstrap";
import { Paper } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import moment from "moment";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import {
  getAddress,
  getFullname,
  formatThousandVND,
} from "../../../../../../utils/commonFunction";
import Colors from "../../../../../../constants/Colors";

const GroundDetailCard = ({ orderDetail, benefits }) => {
  const { subGround } = orderDetail;
  const { title, address, benefit, user: manager, phone } = subGround.ground;
  const { startDay, startTime, endTime, price, discount } = orderDetail;
  const groundBenefit = benefit.split(",");

  const getDiffDate = () => {
    const diff = moment(startDay).diff(moment());
    if (diff) {
      const diffDay = moment(startDay, "DD-MM-YYYY").diff(moment(), "days");
      return diffDay ? `(${diffDay} days from now)` : "";
    } else {
      const diffTime = moment(startTime, "HH:mm:ss").diff(moment(), "hours");
      return diffTime ? `(${diffTime} hours from now)` : "";
    }
  };

  return (
    <Paper elevation={3} className="p-4">
      <h5 className="font-weight-bold">{title}</h5>
      <p className="mb-1">Address: {getAddress(address) || "No address"}</p>
      <p>
        Phone:{" "}
        <a href={`tel:${phone}`} alt="">
          {phone || "No phone"}
        </a>{" "}
      </p>
      <div>
        {!groundBenefit.length ? (
          <p>
            <StarIcon fontSize="small" style={{ color: Colors.star }} />
            <StarIcon fontSize="small" style={{ color: Colors.star }} />
            <StarIcon fontSize="small" style={{ color: Colors.star }} />
            <StarIcon fontSize="small" style={{ color: Colors.star }} />
            <StarIcon fontSize="small" style={{ color: Colors.star }} />
          </p>
        ) : (
          groundBenefit.map((key) => (
            <>
              {benefits[key] ? (
                <>
                  <CheckCircleIcon style={{ color: "#61b15a" }} />{" "}
                  {benefits[key].title}{" "}
                </>
              ) : (
                ""
              )}
            </>
          ))
        )}
      </div>
      <div>
        <hr />
        <div className="mb-2">
          <strong>
            Manager: {getFullname(manager.firstName, manager.lastName)}{" "}
            {manager.phone ? `(${manager.phone})` : ""}
          </strong>
        </div>
        <p>
          <span>Email: </span>
          <span>{manager.email}</span>
        </p>
      </div>
      <hr></hr>
      <p>
        <EmojiPeopleIcon fontSize="small" />
        {subGround.name} {`( ${subGround.numberOfPlayers} players )`}
      </p>
      <p>
        <EventAvailableIcon fontSize="small" />
        {` From ${moment(startTime, "HH:mm:ss").format("HH:mm")}`}
        <ArrowForwardIcon fontSize="small" />
        {` To ${moment(endTime, "HH:mm:ss").format("HH:mm")}`}
      </p>
      <p>
        {moment().format("dddd, DD-MM-YYYY")} {getDiffDate()}
      </p>
      <hr />
      <Row>
        <Col xs={6}>
          <p>Price </p>
        </Col>
        <Col xs={6}>
          <p style={{ textDecoration: "line-through" }}>
            {formatThousandVND(price, " VND")}
          </p>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <p>Discount</p>
        </Col>
        <Col xs={6}>
          <p> {formatThousandVND((price * discount) / 100, " VND")} </p>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col xs={6}>
          <p className="font-weight-bold">Total payment</p>
        </Col>
        <Col xs={6}>
          <p className="font-weight-bold">
            {formatThousandVND((price * (100 - discount)) / 100, " VND")}
          </p>
        </Col>
      </Row>
    </Paper>
  );
};

export default GroundDetailCard;
