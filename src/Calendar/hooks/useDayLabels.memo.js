import { useMemo } from "react";
import moment from "../utils/my.moment";

export function useDayLabels() {
  return useMemo(() => {
    const dates = [];
    let i = 0;
    for (; i < 7; i = i + 1) {
      dates.push(moment().weekday(i).startOf("day"));
    }
    return {
      standard: dates.map((date) => date.format("dddd")),
      abbr: dates.map((date) => date.format("ddd"))
    };
  }, []);
}
