import React from "react";
import { useDayLabels } from "../../hooks/useDayLabels.memo";

import styles from "./DaysOfTheWeek.module.scss";

export function DaysOfTheWeek() {
  const { abbr } = useDayLabels();

  return (
    <header className={styles.container}>
      {abbr.map((day, idx) => (
        <span key={`${day}${idx}`} className={styles.head}>
          {day}
        </span>
      ))}
    </header>
  );
}
