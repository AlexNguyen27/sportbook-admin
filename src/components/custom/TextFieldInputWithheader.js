import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import InvalidMessage from './InvalidMessage';
const TextFieldInput = ({ header, onChange, error, ...rest }) => {
  return (
    <Fragment>
      {header && <h6 className="font-weight-bold mt-3">{header}</h6>}
      <TextField
        onChange={(e) => onChange(e)}
        error={error && error !== ''}
        {...rest}
      />
      <InvalidMessage error={error} />
    </Fragment>
  );
};

export default TextFieldInput;
