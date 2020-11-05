import React, { Fragment } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InvalidMessage from "./InvalidMessage";

const DropdownV2 = ({
  width,
  placeholder,
  defaultPlaceholderValue,
  disabledPlaceholder,
  options,
  valueBasedOnProperty,
  displayProperty,
  onChange,
  error,
  inline,
  ...rest
}) => {
  return (
    <Fragment>
      {valueBasedOnProperty ? (
        <TextField
          {...rest}
          select
          style={{ width: "100px", width }}
          onChange={e => {
            onChange(e.target.value);
          }}
          error={error}
        >
          {placeholder && (
            <MenuItem
              value={defaultPlaceholderValue}
              disabled={
                disabledPlaceholder === null ? true : disabledPlaceholder
              }
            >
              {placeholder}
            </MenuItem>
          )}
          {options.map((option, index) => (
            <MenuItem key={index} value={option[valueBasedOnProperty]}>
              {option[displayProperty]}
            </MenuItem>
          ))}
        </TextField>
      ) : (
        <TextField
          {...rest}
          select
          style={{ width: "100px", width }}
          onChange={e => {
            onChange(e.target.value);
          }}
          error={error && error !== ""}
        >
          {placeholder && (
            <MenuItem value=" " disabled>
              {placeholder}
            </MenuItem>
          )}
          {options.map((option, index) => (
            <MenuItem key={index} value={index}>
              {option[displayProperty]}
            </MenuItem>
          ))}
        </TextField>
      )}

      <InvalidMessage error={error} />
      {!inline && <div />}
    </Fragment>
  );
};

export default DropdownV2;
