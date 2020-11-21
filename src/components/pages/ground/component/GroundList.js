import React, { useEffect, useState } from "react";
import GroundCard from "../../../layout/GroundCard";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

const GroundList = ({ grounds, onDelete }) => {
  const groundArr = Object.keys(grounds).map((groundId) => grounds[groundId]);

  return (
    <Grid container type="flex" justify="center" spacing={3}>
      {groundArr.map((ground) => (
        <Grid item xs={3} key={ground}>
          <GroundCard ground={ground} onDelete={onDelete} />
        </Grid>
      ))}
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  grounds: state.ground.grounds,
});

export default connect(mapStateToProps, null)(GroundList);
