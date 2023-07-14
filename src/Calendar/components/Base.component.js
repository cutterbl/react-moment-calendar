import React from "react";
import classnames from "classnames";
import { View } from "./View.component";
import { useCalendar } from "../context/calendar.context";

import styles from "./Base.module.scss";

export function Base({ className, style }) {
  const { view } = useCalendar();
  return (
    <div
      className={classnames(styles.container, styles[view], className)}
      style={style}
    >
      <View />
    </div>
  );
}
