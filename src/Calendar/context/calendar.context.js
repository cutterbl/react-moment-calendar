import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo
} from "react";
import { useCalendarReducer } from "./calendar.reducer";
import moment from "../utils/my.moment";

const returnFalse = () => false;

const CalendarContext = createContext();

export function CalendarProvider({
  id,
  isDateDisabled: isDisabled = returnFalse,
  name,
  onChange,
  timezone = moment.currentIANAZoneName,
  value: fieldValue,
  ...props
}) {
  const [state, dispatch] = useCalendarReducer({ date: fieldValue, timezone });

  useEffect(
    () => dispatch({ type: "SET_SELECTED", args: { date: fieldValue } }),
    [fieldValue]
  );

  useEffect(() => dispatch({ type: "SET_TIMEZONE", args: { timezone } }), [
    timezone
  ]);

  const onViewChange = useCallback(
    ({ view }) => dispatch({ type: "SET_VIEW", args: { view } }),
    []
  );

  const isDateDisabled = useCallback(
    (date) => {
      if (!date) {
        return false;
      }
      if (
        !moment
          .tz(date, timezone)
          .inRange(
            moment.tz(state.activeDate, timezone).startOf("month"),
            moment.tz(state.activeDate, timezone).endOf("month")
          )
      ) {
        return true;
      }
      return isDisabled(date, timezone);
    },
    [isDisabled, state.activeDate, timezone]
  );

  const onMonthChange = useCallback(
    (month) => {
      if (typeof month === "string") {
        dispatch({ type: "SET_MONTH", args: { month } });
      } else {
        /* Used by prev/next, which a moment obj and might span new/old year */
        dispatch({ type: "SET_DATE", args: { date: month } });
      }
    },
    [timezone]
  );

  const onYearChange = useCallback(
    ({ date, select = false }) => {
      const year = moment.tz(date, timezone).year();
      dispatch({ type: "SET_YEAR", args: { year, select } });
    },
    [timezone]
  );

  const onSelect = useCallback(
    ({ date }) => {
      const newValue = moment.tz(date, timezone).toJSON();
      onChange({ id, name, value: newValue });
    },
    [id, name, onChange, timezone]
  );

  const value = useMemo(
    () => ({
      activeDate: state.activeDate,
      isDateDisabled,
      onMonthChange,
      onSelect,
      onViewChange,
      onYearChange,
      range: state.range,
      timezone: state.timezone,
      selectedDate: state.selectedDate,
      view: state.view
    }),
    [
      isDateDisabled,
      onMonthChange,
      onSelect,
      onViewChange,
      onYearChange,
      state.activeDate,
      state.range,
      state.timezone,
      state.selectedDate,
      state.view
    ]
  );

  return <CalendarContext.Provider value={value} {...props} />;
}

export function useCalendar() {
  return useContext(CalendarContext);
}
