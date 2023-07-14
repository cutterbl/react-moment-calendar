import React from "react";
import classnames from "classnames";
import { useCalendar } from "../../context/calendar.context";

import styles from "./YearButton.module.scss";

export function YearButton({ date }) {
  const { activeDate, onYearChange } = useCalendar();

  const onClick = () => onYearChange({ date, select: true });

  return (
    <button
      className={classnames(styles.button, {
        [styles.activeDate]: activeDate.eq(date, "year")
      })}
      onClick={onClick}
    >
      {date.format("YYYY")}
    </button>
  );
}
