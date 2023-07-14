import React from "react";
import { useCalendar } from "../context/calendar.context";
import { Days } from "./views/Days.component";
import { Years } from "./views/Years.component";

const views = {
  day: Days,
  year: Years
};

export function View() {
  const { view } = useCalendar();
  const Component = views[view];

  if (!Component) {
    throw new Error(`The ${view} 'view' does not exist`);
  }

  return <Component />;
}
