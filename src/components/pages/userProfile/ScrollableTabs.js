import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import PostCard from "../../custom/PostCard";
import SubjectIcon from "@material-ui/icons/Subject";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import Button from "@material-ui/core/Button";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";

import SubUserInfo from "./SubUserInfo";
import Connection from "./connection/Connection";
import Favorites from "./favorite/Favorites";
import Albums from "./albums/Albums";
import { albums } from "../../../mockup/albums";
import Colors from "../../../constants/Colors";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  containRoot: {
    flexGrow: 1,
    background: Colors.background,
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  btn: {
    marginBottom: "16px",
  },
}));

const ScrollableTabs = ({ users, user_profile, authUserId, role }) => {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue, "--------------------------");
    setValue(newValue);
  };

  const connections =
    user_profile && user_profile.followed.length > 0
      ? user_profile.followed.map((con) => {
          if (con.toUserId)
            return {
              userId: users[con.toUserId].id,
              firstName: users[con.toUserId].firstName,
              lastName: users[con.toUserId].lastName,
              githubUsername: users[con.toUserId].githubUsername,
              quote: users[con.toUserId].quote,
              imageUrl: users[con.toUserId].imageUrl,
            };
        })
      : [];

  const isCurrentAuth = user_profile && authUserId === user_profile.id;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab
            label={`Posts (${user_profile ? user_profile.posts.length : 0})`}
            icon={<SubjectIcon />}
            {...a11yProps(0)}
          />
          <Tab
            label={`Connections (${
              user_profile ? user_profile.followed.length : 0
            })`}
            icon={<PeopleAltIcon />}
            {...a11yProps(1)}
          />
          <Tab
            label={`Favorites (${
              user_profile ? user_profile.userFavoritePosts.length : 0
            })`}
            icon={<FavoriteIcon />}
            {...a11yProps(2)}
          />
          <Tab
            label={`Albums (${albums.length})`}
            icon={<PhotoLibraryIcon />}
            {...a11yProps(3)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div style={{ margin: "0px -24px" }}>
          <Grid container spacing={3} className={classes.containRoot}>
            <Grid item xs={7}>
              {isCurrentAuth && (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.btn}
                  onClick={() => {
                    history.push("/add-new-post");
                  }}
                >
                  Add new post
                </Button>
              )}
              {user_profile &&
              user_profile.posts &&
              user_profile.posts.length > 0 ? (
                user_profile.posts.map((item) => (
                  <>
                    <Grid item style={{ marginBottom: "20px" }} key={item.id}>
                      <PostCard
                        post={item}
                        authUserId={authUserId}
                        isCurrentAuth={isCurrentAuth}
                      />
                    </Grid>
                  </>
                ))
              ) : (
                <Typography
                  variant="h6"
                  className="text-center"
                  color="textSecondary"
                  component="p"
                >
                  {" "}
                  NO POSTS, MAY BE YOU SHOULD ADD SOME :D
                </Typography>
              )}
            </Grid>
            <Grid item xs={5}>
              <SubUserInfo userInfo={user_profile} connections={connections} />
            </Grid>
          </Grid>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {!connections.length && (
          <Typography
            variant="h6"
            className="text-center"
            component="p"
            color="textSecondary"
            style={{ background: Colors.background }}
          >
            NO CONNECTIONS
          </Typography>
        )}
        <Connection connections={connections} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        {user_profile &&
        user_profile.userFavoritePosts &&
        user_profile.userFavoritePosts.length > 0 ? (
          <Favorites
            favoritePosts={
              (user_profile && user_profile.userFavoritePosts) || []
            }
            userProfile={user_profile}
            authUserId={authUserId}
          />
        ) : (
          <Typography
            variant="h6"
            className="text-center"
            component="p"
            style={{ background: Colors.background }}
            color="textSecondary"
          >
            NO FAVORITE POSTS
          </Typography>
        )}
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Albums />
      </TabPanel>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.user.users,
  authUserId: state.auth.user.id,
  role: state.auth.user.role,
  posts: state.post.posts,
});

export default connect(mapStateToProps, {})(ScrollableTabs);
