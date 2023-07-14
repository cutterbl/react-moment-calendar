import { useMemo } from "react";
import moment from "../utils/my.moment";

export function useMonthLabels() {
  return useMemo(() => {
    const dates = [];
    let i = 0;
    for (; i < 12; i = i + 1) {
      dates.push(moment().month(i).startOf("day"));
    }
    return {
      standard: dates.map((date) => date.format("MMMM")),
      abbr: dates.map((date) => date.format("MMM"))
    };
  }, []);
}
