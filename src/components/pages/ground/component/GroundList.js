import React from "react";
import GroundCard from "../../../layout/GroundCard";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

const GroundList = ({ grounds, onDelete, onEdit }) => {
  const groundArr = Object.keys(grounds).map((groundId) => grounds[groundId]);

  return (
    <Grid container type="flex" justify="center" spacing={3}>
      {groundArr.map((ground) => (
        <Grid item xs={3} key={ground.id}>
          <GroundCard ground={ground} onDelete={onDelete} onEdit={onEdit}/>
        </Grid>
      ))}
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  grounds: state.ground.grounds,
});

export default connect(mapStateToProps, null)(GroundList);
