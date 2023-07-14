import React, { Fragment, useCallback } from "react";
import { Header } from "../Header.component";
import { DayButton } from "../buttons/DayButton.component";
import { DaysOfTheWeek } from "./DaysOfTheWeek.component";
import { useCalendar } from "../../context/calendar.context";
import moment from "../../utils/my.moment";

import styles from "./Days.module.scss";

export function Days() {
  const { range, activeDate, onMonthChange, timezone } = useCalendar();
  const prev = useCallback(() => {
    const newMonth = moment.tz(activeDate, timezone).subtract(1, "M");
    onMonthChange(newMonth);
  }, [activeDate, timezone]);
  const next = useCallback(() => {
    const newMonth = moment.tz(activeDate, timezone).add(1, "M");
    onMonthChange(newMonth);
  }, [activeDate, timezone]);
  return (
    <Fragment>
      <Header next={next} prev={prev} />
      <DaysOfTheWeek />
      <div className={styles.container}>
        {range.map((date, idx) => (
          <DayButton key={`${date.toJSON()}${idx}`} date={date} />
        ))}
      </div>
    </Fragment>
  );
}
