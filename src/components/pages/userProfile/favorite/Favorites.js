import React from "react";
import PostCard from "../../../custom/PostCard";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  containRoot: {
    flexGrow: 1,
    background: "#fafafa",
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

const Favorites = ({ favoritePosts, userProfile, authUserId}) => {
  const classes = useStyles();
  return (
    <div style={{ margin: "0px -24px" }}>
      <Grid container spacing={3} className={classes.containRoot}>
        {favoritePosts.map((item) => (
          <Grid item xs={6} style={{ marginBottom: "20px" }}>
            <PostCard liked post={item} userProfile={userProfile} authUserId={authUserId}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
});
export default connect(mapStateToProps, {})(Favorites);
