import React, { Fragment, useCallback } from "react";
import { Header } from "../Header.component";
import { YearButton } from "../buttons/YearButton.component";
import { useCalendar } from "../../context/calendar.context";
import moment from "../../utils/my.moment";

import styles from "./Years.module.scss";

export function Years() {
  const { range, activeDate, onYearChange, timezone } = useCalendar();
  const prev = useCallback(
    () =>
      onYearChange({
        date: moment.tz(activeDate, timezone).subtract(1, "decade")
      }),
    [activeDate, timezone]
  );
  const next = useCallback(
    () =>
      onYearChange({ date: moment.tz(activeDate, timezone).add(1, "decade") }),
    [activeDate, timezone]
  );
  return (
    <Fragment>
      <Header next={next} prev={prev} />
      <div className={styles.container}>
        {range.map((date, idx) => (
          <YearButton key={`${date.toJSON()}${idx}`} date={date} />
        ))}
      </div>
    </Fragment>
  );
}
