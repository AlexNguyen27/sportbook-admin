import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
// import event from "../../constants/events";
import { connect } from "react-redux";
require("react-big-calendar/lib/css/react-big-calendar.css");
const localizer = momentLocalizer(moment);

const MyCalendar = ({ orders }) => {
  const dataSource = Object.keys(orders).map((key) => ({
    id: key,
    title: orders[key].subGround.name,
    start: moment(orders[key].startDay + " " + orders[key].startTime),
    end: moment(orders[key].startDay + " " + orders[key].endTime),
  }));

  console.log(dataSource);
  return (
    <Calendar
      localizer={localizer}
      events={dataSource}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 690 }}
    />
  );
};

const mapStateToProps = (state) => ({
  orders: state.order.orders,
});
export default connect(mapStateToProps, null)(MyCalendar);
