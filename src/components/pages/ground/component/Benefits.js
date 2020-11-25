import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormLabel,
  FormControlLabel,
  FormControl,
  Checkbox,
  FormGroup,
} from "@material-ui/core";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
}));
const Benefits = ({ benefits, checked, setChecked }) => {
  const classes = useStyles();

  const handleChange = (e) => {
    const newChecked = { ...checked };
    const { name } = e.target;
    if (checked[name]) {
      delete newChecked[name];
    } else {
      newChecked[name] = true;
    }
    setChecked({ ...newChecked });
  };

  return (
    <div>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Benefits</FormLabel>
        <FormGroup row>
          {Object.keys(benefits).map((key) => (
            <FormControlLabel
              key={benefits[key].id}
              control={
                <Checkbox
                  checked={checked[key] ? true : false}
                  onChange={(e) => handleChange(e)}
                  name={key || ""}
                  value={key || ""}
                />
              }
              label={benefits[key].title}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};

const mapStateToProps = (state) => ({
  benefits: state.benefit.benefits,
});

export default connect(mapStateToProps, null)(Benefits);
