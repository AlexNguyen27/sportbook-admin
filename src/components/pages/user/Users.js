import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import UserCard from "../userProfile/connection/UserCard";
import { getUsers } from "../../../store/actions/user";
import PageLoader from "../../custom/PageLoader";

const Users = ({ users, getUsers, location }) => {
  const [loading, setLoading] = useState(true);
  const [usersData, setUsersData] = useState();
  useEffect(() => {
    getUsers(setLoading);
  }, []);

  const userArr = Object.keys(users).map((key) => users[key]);

  useEffect(() => {
    let searchText = location.searchText;
    if (searchText && searchText.trim() !== "") {
      searchText = location.searchText.toLowerCase();
      const mockup = (userArr || []).filter((user) => {
        return (
          (user.firstName && user.firstName.toLowerCase().match(searchText)) ||
          (user.lastName && user.lastName.toLowerCase().match(searchText)) ||
          (user.address && user.address.toLowerCase().match(searchText)) ||
          (user.githubUsename &&
            user.githubUsename.toLowerCase().match(searchText)) ||
          (user.username && user.username.toLowerCase().match(searchText))
        );
      });
      setUsersData(mockup);
    } else {
      setUsersData(userArr);
    }
  }, [location]);

  return (
    <PageLoader loading={loading}>
      <div
        style={{
          marginRight: "-24px",
          marginLeft: "-24px",
        }}
      >
        <Grid
          container
          spacing={3}
          className="mt-3"
          justify={usersData && usersData.length === 0 ? "center" : ""}
        >
          {usersData && usersData.length > 0 ? (
            usersData.map((user) => (
              <Grid item key={user.id} xs={4} className="userCard">
                <UserCard userInfo={user} />
              </Grid>
            ))
          ) : (
            <div className="justify-content-center">
              <Typography variant="h6" color="textSecondary" component="p">
                NO USERS FOUND!
              </Typography>
            </div>
          )}
        </Grid>
      </div>
    </PageLoader>
  );
};

const mapStateToProps = (state) => ({
  users: state.user.users,
});
export default connect(mapStateToProps, { getUsers })(Users);
