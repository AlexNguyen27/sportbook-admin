import React from "react";
import { connect } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import {  dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
const locales = {
  'en-US': require('date-fns/locale/en-US'),
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})
// import event from "../../constants/events";
require("react-big-calendar/lib/css/react-big-calendar.css");
// const localizer = momentLocalizer(moment);

const MyCalendar = ({ orders }) => {
  const dataSource = Object.keys(orders).map((key) => ({
    id: key,
    title: key,
    start: new Date(orders[key].startDay + " " + orders[key].startTime),
    end: moment(orders[key].startDay + " " + orders[key].endTime),
  }));

  console.log(dataSource);
  return (
    <Calendar
      localizer={localizer}
      events={dataSource}
      scrollToTime={new Date(1970, 1, 1, 6)}
      defaultDate={new Date(2015, 3, 12)}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  );
};

const mapStateToProps = (state) => ({
  orders: state.order.orders,
});
export default connect(mapStateToProps, null)(MyCalendar);
