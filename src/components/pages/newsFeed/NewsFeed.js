import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import PostCard from "../../custom/PostCard";
import SubNewsFeed from "./component/SubNewsFeed";
import { getPosts, getAllPublicPost } from "../../../store/actions/post";
import { getUsers } from "../../../store/actions/user";
import { getCategories } from "../../../store/actions/category";
import PageLoader from "../../custom/PageLoader";
import { getReactionTypes } from "../../../store/actions/like";
import { Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    margin: "10px 0 0 0",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const NewsFeed = ({
  selectedPost,
  authProfile,
  getReactionTypes,
  role,
  getCategories,
  getAllPublicPost,
  authUserId,
  getUsers,
  location,
  posts,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [postsArr, setPostsArr] = useState(
    posts && Object.keys(posts).map((key) => posts[key])
  );

  const [noti, setNoti] = useState(
    "NO POSTS, ADD SOME FRIENDS OR YOUR OWN POST :D"
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState("news");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPublicPost(setLoading).then(() => {
      setLoading(true);
      getCategories(setLoading).then(() => {
        setLoading(true);
        getUsers(setLoading);
        getReactionTypes(setLoading).then(() => {
          onClickCategory("news");
        });
      });
    });
  }, []);

  useEffect(() => {
    onClickCategory("news");
  }, [authProfile]);

  const onClickCategory = (categoryId) => {
    if (!authProfile) {
      return;
    }
    setSelectedCategoryId(categoryId);
    if (categoryId === "all") {
      setPostsArr(posts && Object.keys(posts).map((key) => posts[key]));
      return;
    }
    if (categoryId === "news") {
      let toUsers =
        authProfile.followed.length > 0
          ? authProfile.followed.map((item) => item.toUserId)
          : [];
      if (toUsers) {
        toUsers.push(authProfile.id);
      }
      const followedUserPosts = [];
      Object.keys(posts).map((key) => {
        for (let i = 0; i < toUsers.length; i++) {
          if (posts[key].userId === toUsers[i]) {
            followedUserPosts.push(posts[key]);
          }
        }
      });
      setPostsArr(followedUserPosts);
      return;
    }
    const test = [];
    const postsArr =
      posts &&
      Object.keys(posts).map(
        (key) => posts[key].categoryId === categoryId && test.push(posts[key])
      );

    setPostsArr(test);
  };

  useEffect(() => {
    let searchText = location.searchText;
    const allPostArr = Object.keys(posts).map((key) => posts[key]);
    if (searchText && searchText.trim() !== "") {
      searchText = searchText && location.searchText.toLowerCase();
      const mockup = (allPostArr || []).filter((post) => {
        return (
          (post.title && post.title.toLowerCase().match(searchText)) ||
          (post.description &&
            post.description.toLowerCase().match(searchText)) ||
          post.user.username.toLowerCase().match(searchText) ||
          (post.user.firstName &&
            post.user.firstName.toLowerCase().match(searchText)) ||
          (post.user.lastName &&
            post.user.lastName.toLowerCase().match(searchText))
        );
      });
      if (!mockup.length) {
        setNoti("NO POST FOUND");
      }
      setPostsArr(mockup);
    } else {
      onClickCategory("news");
    }
  }, [location]);

  return (
    <div className={classes.root}>
      <PageLoader loading={loading}>
        <Grid container spacing={3} justify="center">
          <Grid item xs={10}>
            <div style={{ margin: "0px " }}>
              <Grid
                container
                justify="center"
                spacing={5}
                className={classes.containRoot}
              >
                <Grid item xs={4}>
                  <SubNewsFeed
                    onClickCategory={onClickCategory}
                    selectedCategoryId={selectedCategoryId}
                  />
                </Grid>
                <Grid item xs={8}>
                  {postsArr && postsArr.length > 0 ? (
                    postsArr.map((item) => (
                      <Grid item style={{ marginBottom: "20px" }}>
                        <PostCard
                          post={item}
                          authUserId={authUserId}
                          isCurrentAuth={item.userId === authUserId}
                        />
                      </Grid>
                    ))
                  ) : (
                    <>
                      <Typography
                        variant="h6"
                        className="text-center"
                        color="textSecondary"
                        component="p"
                      >
                        {noti}
                      </Typography>
                      <div className="text-center mt-4">
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.btn}
                          onClick={() => {
                            history.push("/people");
                          }}
                        >
                          FIND FRIENDS
                        </Button>
                      </div>
                    </>
                  )}
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </PageLoader>
    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: state.category.categories,
  authUserId: state.auth.user.id,
  posts: state.post.posts,
  selectedPost: state.post.selected_post,
  role: state.auth.user.role,
  authProfile: state.user_profile.user_profile,
});
export default connect(mapStateToProps, {
  getPosts,
  getCategories,
  getUsers,
  getAllPublicPost,
  getReactionTypes,
})(NewsFeed);
