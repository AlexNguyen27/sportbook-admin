import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import PriceList from "../../price/PriceList";
import { truncateMultilineString } from "../../../../utils/formatString";
import Tooltip from "@material-ui/core/Tooltip";
import { getSubGrounds } from "../../../../store/actions/subGround";
import PageLoader from "../../../custom/PageLoader";
import { Button } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useHistory } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    // height: 600,
    marginTop: "20px",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const GroundDetail = ({ subGrounds, groundId, getSubGrounds }) => {
  const classes = useStyles();
  const history = useHistory();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSubGrounds(setLoading, groundId);
  }, [groundId]);

  const subGroundArr = Object.keys(subGrounds).map(
    (subGroundId) => subGrounds[subGroundId]
  );

  const [value, setValue] = React.useState(
    !subGroundArr.length ? "" : subGroundArr[0].id
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {!subGroundArr.length ? (
        <Typography
          className="text-center"
          variant="button"
          display="block"
          gutterBottom
        >
          No Subgrounds
        </Typography>
      ) : (
        <PageLoader loading={loading}>
          <Button
            variant="contained"
            color="default"
            className={classes.btn}
            startIcon={<ArrowBackIosIcon />}
            onClick={() => history.goBack()}
          >
            Go Back
          </Button>
          <div className={classes.root}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value || subGroundArr[0].id}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              className={classes.tabs}
            >
              {subGroundArr.map((subGround) => (
                <Tab
                  key={subGround.id}
                  value={subGround.id}
                  label={
                    <Tooltip title={subGround.name} placement="left">
                      <div>{truncateMultilineString(subGround.name, 12)}</div>
                    </Tooltip>
                  }
                  {...a11yProps(subGround.id)}
                />
              ))}
            </Tabs>
            {subGroundArr.map((subGround) => (
              <TabPanel
                key={subGround.id}
                value={value || subGroundArr[0].id}
                index={subGround.id}
                style={{ width: "90%" }}
              >
                <PriceList subGround={subGround} />
              </TabPanel>
            ))}
          </div>
        </PageLoader>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  subGrounds: state.subGround.subGrounds,
});

export default connect(mapStateToProps, { getSubGrounds })(GroundDetail);
