import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import event from "../../constants/events";
require("react-big-calendar/lib/css/react-big-calendar.css");
const localizer = momentLocalizer(moment);

const MyCalendar = (props) => {
  return (
      <Calendar
        localizer={localizer}
        events={event}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 690 }}
      />
  );
};

export default MyCalendar;
