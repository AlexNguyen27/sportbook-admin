import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import EventIcon from "@material-ui/icons/Event";
import moment from "moment";
import PersonIcon from "@material-ui/icons/Person";
import { getPopularPost } from "../../../../utils/commonFunction";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    padding: 0,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: "100%",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  header: {
    marginLeft: "12px",
    marginTop: "30px",
    marginBottom: "5px",
  },
  item: {
    // border: "1px solid #e3e3e3",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
  },
}));
const PopularArticles = ({ posts }) => {
  const classes = useStyles();
  const history = useHistory();

  const popularPosts = getPopularPost(posts, 7);
  return (
    <>
      <Typography variant="h5" gutterBottom className={classes.header}>
        Popular Articles
      </Typography>

      <List
        component="nav"
        className={classes.root}
        aria-label="mailbox folders"
      >
        {posts &&
          popularPosts.map((item) => (
            <>
              <ListItem
                button
                className={classes.item}
                onClick={() => history.push(`/view-post/${item.id}`)}
              >
                <Grid container spacing={2}>
                  <Grid item xs={3} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography variant="body1" gutterBottom>
                          {item.title}
                        </Typography>
                        <div>
                          <Typography variant="caption" color="textSecondary">
                            <EventIcon />
                            {moment(item.createdAt).format("MMM Do YYYY")}
                          </Typography>
                        </div>
                        <Typography variant="caption" color="textSecondary">
                          <PersonIcon />
                          {item.user.firstName || item.user.lastName
                            ? item.user.firstName + " " + item.user.lastName
                            : item.user.username}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="caption"
                          style={{ cursor: "pointer" }}
                        >
                          {item.reactions.length}{" "}
                          {item.reactions.length > 1 ? `Likes` : `Like`}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider />
            </>
          ))}
      </List>
    </>
  );
};

const mapStateToProps = (state) => ({
  categories: state.category.categories,
  posts: state.post.posts,
});
export default connect(mapStateToProps, {})(PopularArticles);
