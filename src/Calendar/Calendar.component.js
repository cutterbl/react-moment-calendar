import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Base } from "./components/Base.component";
import { CalendarProvider } from "./context/calendar.context";

export function Calendar({ className, style, ...props }) {
  const { id, name, required, value } = props;
  return (
    <Fragment>
      <CalendarProvider {...props}>
        <Base className={className} style={style} />
      </CalendarProvider>
      <input
        type="hidden"
        id={id}
        name={name}
        required={required}
        value={value}
        data-testid={`${name}_calendar_input`}
      />
    </Fragment>
  );
}

Calendar.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  isDateDisabled: PropTypes.func,
  name: PropTypes.name,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  timezone: PropTypes.string,
  value: PropTypes.string
};
