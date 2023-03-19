
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";
import Card from "../UI/Card"
const CalendarComponent = (props) => {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Card>
        <Calendar onChange={onChange} value={value} />
      </Card>
    </div>
  );
}

export default CalendarComponent;
