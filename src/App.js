import React, { useState, useCallback } from "react";
import { Calendar } from "./Calendar/Calendar.component";
import moment from "./Calendar/utils/my.moment";
import { activeDates as active } from "./activeDates";

const activeDates = active.map((date) =>
  moment.tz(date, moment.currentIANAZoneName).startOf("day").toJSON()
);

export default function App() {
  const [value, setValue] = useState("1969-11-07T14:47:32Z");
  const onChange = useCallback(({ value: newVal }) => setValue(newVal), []);
  const isDateDisabled = useCallback((date, timezone) => {
    if (activeDates.includes(moment.tz(date, timezone).toJSON())) {
      return false;
    }
    return true;
  }, []);
  return (
    <div className="App">
      <Calendar
        id="foo"
        name="foo"
        value={value}
        onChange={onChange}
        isDateDisabled={isDateDisabled}
        style={{ width: 400 }}
      />
      <h2>Selected Date: {moment(value).format("MM/DD/YYYY")}</h2>
    </div>
  );
}
