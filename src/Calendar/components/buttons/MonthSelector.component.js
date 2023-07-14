import React, { Fragment } from "react";
import classnames from "classnames";
import { useSelect } from "downshift";
import { useMonthLabels } from "../../hooks/useMonthLabels.memo";
import { useCalendar } from "../../context/calendar.context";

import styles from "./MonthSelector.module.scss";

export function MonthSelector() {
  const { standard: months } = useMonthLabels();
  const { activeDate, onMonthChange } = useCalendar();
  const month = activeDate.format("MMMM");
  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps
  } = useSelect({
    items: months,
    selectedItem: month,
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) =>
      onMonthChange(newSelectedItem)
  });

  return (
    <div className={styles.container}>
      <div className={styles.label} {...getToggleButtonProps()}>
        {month}
      </div>
      <ul
        className={classnames(styles.list, {
          [styles.hidden]: !isOpen
        })}
        {...getMenuProps()}
      >
        {isOpen ? (
          <Fragment>
            {months.map((item, index) => (
              <li
                key={`${item}${index}`}
                className={classnames(styles.standard, {
                  [styles.selected]: item === month,
                  [styles.highlighted]: index === highlightedIndex
                })}
                {...getItemProps({ item, index })}
              >
                {item}
              </li>
            ))}
          </Fragment>
        ) : null}
      </ul>
    </div>
  );
}
