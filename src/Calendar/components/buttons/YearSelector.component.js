import React from "react";
import { useCalendar } from "../../context/calendar.context";

import styles from "./YearSelector.module.scss";

export function YearSelector() {
  const { activeDate, onViewChange } = useCalendar();

  const showYearView = () => onViewChange({ view: "year" });

  return (
    <button className={styles.button} onClick={showYearView}>
      {activeDate.format("YYYY")}
    </button>
  );
}
