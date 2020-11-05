import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import PageviewIcon from "@material-ui/icons/Pageview";
import { green, pink, grey } from "@material-ui/core/colors";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { albums } from "../../../mockup/albums";
import ImageIcon from "@material-ui/icons/Image";
import EventIcon from "@material-ui/icons/Event";
import CallIcon from "@material-ui/icons/Call";
import HomeIcon from "@material-ui/icons/Home";
import { Fragment } from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import { BASE_IMAGE_URL } from "../../../store/actions/types";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  avatar: {
    margin: "0 auto",
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
    margin: "0 auto",
  },
  green: {
    color: "#fff",
    backgroundColor: green[500],
    margin: "0 auto",
  },
  gray: {
    backgroundColor: "#888",
    color: "#fff",
    margin: "0 auto",
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

const SubUserInfo = ({ userInfo, users, connections }) => {
  const classes = useStyles();

  const {
    username,
    firstName,
    lastName,
    email,
    phone,
    address,
    githubUsername,
    quote,
    posts,
    followed,
  } = userInfo || {};

  return (
    <>
      {/* ABOUT ME */}
      <Paper className={classes.paper}>
        <Typography variant="h5" bold>
          About Me
        </Typography>
        <hr></hr>
        <Grid container>
          <Grid item xs={2}>
            <Avatar className={classes.avatar}>
              <EventIcon />
            </Avatar>
          </Grid>
          <Grid item xs={10}>
            <Typography>Full name</Typography>
            <Typography variant="caption">
              {firstName} {lastName}
            </Typography>
          </Grid>
        </Grid>
        <hr></hr>
        <Grid container>
          <Grid item xs={2}>
            <Avatar className={classes.pink}>
              <CallIcon />
            </Avatar>
          </Grid>
          <Grid item xs={10}>
            <Typography>Phone</Typography>
            <Typography variant="caption">{phone}</Typography>
          </Grid>
        </Grid>
        <hr></hr>
        <Grid container>
          <Grid item xs={2}>
            <Avatar className={classes.green}>
              <HomeIcon />
            </Avatar>
          </Grid>
          <Grid item xs={10}>
            <Typography>Address</Typography>
            <Typography variant="caption">{address}</Typography>
          </Grid>
        </Grid>{" "}
        <hr></hr>
        <Grid container>
          <Grid item xs={2}>
            <Avatar className={classes.gray}>
              <GitHubIcon />
            </Avatar>
          </Grid>
          <Grid item xs={10}>
            <Typography>Github</Typography>
            <Typography variant="caption">
              <a
                href={`https://github.com/${githubUsername}`}
                className="aSubText"
                target="_blank"
              >
                {githubUsername}
              </a>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      {/* My albums */}
      <Paper className={classes.paper}>
        <Typography variant="h5" style={{ paddingBottom: "10px" }}>
          My Albums (99)
        </Typography>
        <div className={classes.root}>
          <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {albums.map((tile) => (
              <GridListTile key={tile.id} cols={tile.cols || 1}>
                <img src={tile.img} alt={tile.title} />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </Paper>
      {/* MY CONNECTION */}
      <Paper className={classes.paper}>
        <Typography variant="h5" bold>
          My Connection
        </Typography>
        <hr></hr>
        {connections.map((item) => (
          <Fragment key={item.userId}>
            <Grid container>
              <Grid item xs={2}>
                <Avatar className={classes.avatar} src={item.imageUrl || BASE_IMAGE_URL}/>
              </Grid>
              <Grid item xs={10}>
                <Typography>
                  {item.firstName} {item.lastName}
                </Typography>
                <Typography variant="caption">
                  <a
                    href={`https://github.com/${item.githubUsername}`}
                    target="_blank"
                    className="aSubText"
                  >
                    {item.githubUsername}
                  </a>
                </Typography>
              </Grid>
            </Grid>
            <hr></hr>
          </Fragment>
        ))}
      </Paper>
    </>
  );
};
const mapStateToProps = (state) => ({
  users: state.user.users,
});
export default connect(mapStateToProps, {})(SubUserInfo);
