import React, { useEffect, useState } from "react";
import AboutCard from "./AboutCard";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ScrollableTabs from "./ScrollableTabs";
import { getUserProfile, getUsers } from "../../../store/actions/user";
import PageLoader from "../../custom/PageLoader";
import { getCategories } from "../../../store/actions/category";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    margin: 0,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const UserProfile = ({
  authId,
  userId,
  getUserProfile,
  getCategories,
  categories,
  user_profile,
}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUserProfile(userId, setLoading);
    if (JSON.stringify(categories) === "{}") {
      setLoading(false);
      getCategories(setLoading);
    }
  }, [userId]);

  const userProfile =
    userId === authId ? user_profile.user_profile : user_profile.friend_profile;
  return (
    <div className={classes.root}>
      <PageLoader loading={loading}>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            <AboutCard userProfile={userProfile} />
          </Grid>
          <Grid item xs={12}>
            <ScrollableTabs user_profile={userProfile} />
          </Grid>
        </Grid>
      </PageLoader>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user_profile: state.user_profile,
  authId: state.auth.user.id,
  categories: state.category.categories,
});
export default connect(mapStateToProps, {
  getUserProfile,
  getCategories,
  getUsers,
})(UserProfile);
