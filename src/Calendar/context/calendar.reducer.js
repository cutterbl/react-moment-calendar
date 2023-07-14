import { useReducer } from "react";
import { VIEWS } from "../utils/defaults";
import moment from "../utils/my.moment";

const defaultView = VIEWS.DAY;

function reducer(state, action) {
  const { type, args } = action;
  switch (type) {
    case "SET_DATE": {
      const { date } = args;
      const { activeDate, timezone } = state;
      const newDate = moment.tz(date, timezone).startOf("day");
      if (newDate.eq(activeDate)) {
        return state;
      }

      return {
        ...state,
        activeDate: newDate,
        view: defaultView,
        range: newDate.calendarDays()
      };
    }
    case "SET_SELECTED": {
      const { date } = args;
      const { selectedDate, activeDate, timezone } = state;
      const newDate = moment.tz(date, timezone).startOf("day");
      if (newDate.eq(activeDate) && newDate.eq(selectedDate)) {
        return state;
      }

      return {
        ...state,
        activeDate: newDate,
        selectedDate: newDate,
        view: defaultView,
        range: newDate.calendarDays()
      };
    }
    case "SET_MONTH": {
      const { month } = args;
      const { activeDate, timezone } = state;
      if (month === activeDate.month()) {
        return state;
      }
      const newDate = moment.tz(activeDate, timezone).month(month);
      return {
        ...state,
        activeDate: newDate,
        view: defaultView,
        range: newDate.calendarDays()
      };
    }
    case "SET_YEAR": {
      const { year, select } = args;
      const { activeDate, timezone } = state;
      if (year === activeDate.year() && !select) {
        return state;
      }
      const newDate = moment.tz(activeDate, timezone).year(year);
      return {
        ...state,
        activeDate: newDate,
        ...(select
          ? {
              range: newDate.calendarDays()
            }
          : {
              range: newDate.calendarDecade()
            }),
        ...(select && {
          view: defaultView
        })
      };
    }
    case "SET_VIEW": {
      const { view: newView } = args;
      const { view, activeDate } = state;
      if (view === newView) {
        return state;
      }
      return {
        ...state,
        view: newView,
        ...(newView === defaultView
          ? {
              range: activeDate.calendarDays()
            }
          : {
              range: activeDate.calendarDecade()
            })
      };
    }
    case "SET_TIMEZONE": {
      const { timezone: newTZ } = args;
      const { activeDate, timezone } = state;
      if (!newTZ || newTZ === timezone) {
        return state;
      }
      const newDate = moment.tz(activeDate, newTZ);
      return {
        ...state,
        activeDate: newDate,
        range: newDate.calendarDays(),
        view: defaultView
      };
    }
    default: {
      throw new Error("[Calendar Reducer] no type was defined");
    }
  }
}

export function useCalendarReducer({
  timezone = moment.currentIANAZoneName,
  date = moment.tz(new Date(), timezone)
}) {
  const activeDate = moment.tz(date, timezone).startOf("day");
  return useReducer(reducer, {
    activeDate,
    selectedDate: activeDate,
    view: defaultView,
    range: activeDate.calendarDays(),
    timezone
  });
}
