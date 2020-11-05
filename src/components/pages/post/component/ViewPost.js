import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getPostById } from "../../../../store/actions/post";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ViewText from "../../../custom/ViewText";
import { Grid, Typography, Divider, Paper } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import CommentsList from "./comment/CommentsList";
import PageTitle from "../../../custom/PageTitle";
import PageLoader from "../../../custom/PageLoader";
import clsx from "clsx";
import PersonIcon from "@material-ui/icons/Person";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
import EventIcon from "@material-ui/icons/Event";
import Colors from "../../../../constants/Colors";
import { likeReaction } from "../../../../store/actions/like";
import PopularArticles from "../../newsFeed/component/PopularArticles";
import { getPopularPost } from "../../../../utils/commonFunction";
import { BASE_IMAGE_URL } from "../../../../store/actions/types";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
const ViewPost = ({
  postId,
  userProfile,
  getPostById,
  selectedPost,
  posts,
  likeReaction,
}) => {
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const history = useHistory();
  const [expanded, setExpanded] = React.useState(false);
  const [isLiked, setIsLiked] = useState(
    userProfile &&
      userProfile.userFavoritePosts.find((item) => item.id === postId)
  );

  useEffect(() => {
    setLoading(true);
    getPostById(setLoading, postId);
  }, [postId]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const {
    title,
    description,
    categoryId,
    view,
    user: {
      id: userId,
      firstName,
      lastName,
      githubUsername,
      imageUrl: avatar,
      username,
    } = {},
    comments,
    reactions,
    updatedAt,
  } = selectedPost || {};
  const [totalLike, setTotalLike] = useState(reactions && reactions.length);
  const totalComments = comments ? comments.length : 0;

  const handleOnLike = () => {
    let userInfo = {};
    if (selectedPost.user) {
      userInfo = {
        id: selectedPost.user.id,
        username: selectedPost.user.username,
        imageUrl: selectedPost.user.imageUrl,
        firstName: selectedPost.user.firstName,
        lastName: selectedPost.user.lastName,
        githubUsername: selectedPost.user.githubUsername,
      };
    }
    likeReaction(
      selectedPost.id,
      categoryId,
      title,
      description,
      setIsLiked,
      setTotalLike,
      userInfo
    );
  };

  useEffect(() => {
    setIsLiked(
      userProfile &&
        userProfile.userFavoritePosts.find((item) => item.id === postId)
    );
    setTotalLike(reactions && reactions.length);
  }, [handleOnLike]);

  const popularPosts = getPopularPost(posts, 8);

  const userName =
    firstName && lastName ? firstName + " " + lastName : username;

  return (
    <PageLoader loading={loading}>
      <Grid container justify="center">
        <Grid item xs={10}>
          <PageTitle title={title} center editMode="false" />
          <Grid container>
            <Grid item xs={12}>
              <Grid container justify="flex-start">
                <Grid
                  item
                  xs={1}
                  className="text-center"
                  onClick={() => history.push(`/user-profile/${userId}`)}
                >
                  <img
                    className="userImage"
                    src={avatar || BASE_IMAGE_URL}
                    alt="user image"
                  />
                </Grid>
                <Grid item xs={8}>
                  <Grid item>
                    <Typography variant="h6">{userName}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">
                      <a
                        className="aSubText"
                        target="_blank"
                        href={`https://github.com/${githubUsername}`}
                      >
                        <GitHubIcon className="mr-1" /> {githubUsername}
                      </a>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="subtitle2"
                      style={{ color: "#888", marginTop: "5px" }}
                    >
                      {moment(updatedAt).format("MMMM Do YYYY, h:mm:ss A")}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <hr className="mb-0" />
              <ViewText textBody={description} className="viewMode viewPost" />
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={5}>
                  <span className="like" style={{ color: Colors.green }}>
                    {view} {view > 1 ? "views" : "view"}
                  </span>
                  <IconButton
                    style={{ color: isLiked ? Colors.like : "" }}
                    aria-label="add to favorites"
                    onClick={() => handleOnLike()}
                  >
                    <FavoriteIcon />
                    <span className="like">{totalLike}</span>
                  </IconButton>
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="Show more comment"
                    style={{ color: Colors.comment }}
                  >
                    <ChatIcon />
                    <span className="like">{totalComments}</span>
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Collapse
                  in={true}
                  timeout="auto"
                  style={{ width: "100%" }}
                  unmountOnExit
                >
                  <Typography
                    variant="h6"
                    style={{ color: "#888", margin: "5px 10px 10px 0px" }}
                  >
                    All Comments
                  </Typography>
                  {/* <hr className="mt-0"/> */}
                  <CommentsList postId={postId} />
                </Collapse>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography className="mb-2 mt-1" variant="h5">
                More from Dev Troops
              </Typography>
              <Divider />

              <Grid
                container
                style={{ cursor: "pointer" }}
                className="mt-3 mb-4"
                spacing="3"
              >
                {popularPosts &&
                  popularPosts.length > 0 &&
                  popularPosts.map((item) => (
                    <>
                      <Grid
                        item
                        className="p-3"
                        xs={3}
                        onClick={() => history.push(`/view-post/${item.id}`)}
                      >
                        <Paper style={{ height: "100%" }}>
                          <Grid container spacing={2} className="p-3">
                            <Grid item xs={3} sm container>
                              <Grid container direction="column">
                                <Grid item>
                                  <Typography variant="h6" gutterBottom>
                                    {item.title}
                                  </Typography>
                                  <div>
                                    <Typography
                                      variant="caption"
                                      color="textSecondary"
                                    >
                                      <EventIcon />
                                      {moment(item.createdAt).format(
                                        "MMM Do YYYY"
                                      )}
                                    </Typography>
                                  </div>
                                  <Typography
                                    variant="caption"
                                    color="textSecondary"
                                  >
                                    <PersonIcon />
                                    {item.user.firstName && item.user.lastName
                                      ? item.user.firstName +
                                        " " +
                                        item.user.lastName
                                      : item.user.username}
                                  </Typography>
                                </Grid>
                                <Grid item className="mt-2">
                                  <Typography
                                    variant="caption"
                                    className="ml-2"
                                  >
                                    {item.reactions.length}{" "}
                                    {item.reactions.length > 1
                                      ? `Likes`
                                      : `Like`}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                    </>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageLoader>
  );
};

const mapStateToProps = (state) => ({
  categories: state.category.categories,
  selectedPost: state.post.selected_post,
  userProfile: state.user_profile.user_profile,
  posts: state.post.posts,
});
export default connect(mapStateToProps, { getPostById, likeReaction })(
  ViewPost
);
