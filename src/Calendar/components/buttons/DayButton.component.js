import React from "react";
import classnames from "classnames";
import { useCalendar } from "../../context/calendar.context";

import styles from "./DayButton.module.scss";

export function DayButton({ date }) {
  const { selectedDate, isDateDisabled, onSelect } = useCalendar();

  const onClick = () => onSelect({ date });

  if (isDateDisabled(date)) {
    return <span className={styles.disabled}>{date.format("D")}</span>;
  }

  return (
    <button
      className={classnames(styles.button, {
        [styles.selected]: selectedDate.eq(date)
      })}
      onClick={onClick}
    >
      {date.format("D")}
    </button>
  );
}
