import React from "react";
import classnames from "classnames";
import { MonthSelector } from "./buttons/MonthSelector.component";
import { YearSelector } from "./buttons/YearSelector.component";

import styles from "./Header.module.scss";

export function Header({ next, prev }) {
  return (
    <header className={styles.header}>
      <div>
        <MonthSelector /> <YearSelector />
      </div>
      <nav>
        <button
          className={classnames(styles.button, styles.navButton)}
          onClick={prev}
        >
          &lt;
        </button>{" "}
        <button
          className={classnames(styles.button, styles.navButton)}
          onClick={next}
        >
          &gt;
        </button>
      </nav>
    </header>
  );
}
