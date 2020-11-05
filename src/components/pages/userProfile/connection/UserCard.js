import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Colors from "../../../../constants/Colors";
import { BASE_IMAGE_URL } from "../../../../store/actions/types";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px",
    backgroundColor: Colors.light_purple,
    height: '100%'
  },
  details: {
    display: "flex",
    flexDirection: "row",
  },
  content: {
    flex: "1 0 auto",
    paddingBottom: "0px !important",
    height: '100%'
  },
  cover: {
    borderRadius: "130px",
    width: 150,
    height: 150,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  btn: {
    marginTop: "16px",
  },
  title: {
    color: Colors.black,
    lineHeight: 1.5,
  },
}));

export default function UserCard({ userInfo }) {
  const classes = useStyles();
  const history = useHistory();

  const { firstName, lastName, quote, imageUrl, username } = userInfo || {};
  const userId = userInfo.userId || userInfo.id;
  const userName =
  firstName && lastName ? firstName + " " + lastName : username;
  return (
    <Card className={classes.root}>
      <Grid container justify="center">
        <CardMedia
          className={classes.cover}
          image={imageUrl || BASE_IMAGE_URL}
          title="Live from space album cover"
        />
      </Grid>
      <Grid container justify="center" style={{ textAlign: "center" }} className="userCard">
        <CardContent className={classes.content} >
          <Typography component="h5" variant="h5" className={classes.title}>
            {userName}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={classes.title}
          >
            {quote}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push(`/user-profile/${userId}`)}
            className={classes.btn}
          >
            See profile
          </Button>
        </CardContent>
      </Grid>
    </Card>
  );
}
