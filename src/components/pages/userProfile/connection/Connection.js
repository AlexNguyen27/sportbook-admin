import React from "react";
import UserCard from "./UserCard";
import { connect } from "react-redux";

import { Grid } from "@material-ui/core";

const Connection = ({ connections }) => {

  return (
    <div style={{ marginRight: "-24px", marginLeft: "-24px" }}>
      <Grid container spacing={3}>
        {connections.map((item) => (
          <Grid item xs={4}>
            <UserCard userInfo={item}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
});
export default  connect(mapStateToProps, {})(Connection);
