import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import Swal from "sweetalert2";
import moment from "moment";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Tooltip from "@material-ui/core/Tooltip";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import Colors from "../../constants/Colors";
import ViewText from "./ViewText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import LockIcon from "@material-ui/icons/Lock";
import { truncateMultilineString } from "../../utils/formatString";
import { likeReaction } from "../../store/actions/like";
import ReportModal from "../pages/post/component/ReportModal";
import { deletePost } from "../../store/actions/post";
import { Typography } from "@material-ui/core";
import { BASE_IMAGE_URL } from "../../store/actions/types";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
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
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
    cursor: "pointer",
  },
}));

const PostCard = ({
  liked,
  deletePost,
  post,
  likeReaction,
  isCurrentAuth,
  authProfile,
  authId,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const [openReportModal, setOpenReportModal] = useState(false);
  const isAuth = post && post.userId === authId;

  const handleClick = (event) => {
    if (!isAuth) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    id,
    title,
    categoryId,
    description,
    status,
    createdAt,
    comments,
    reactions,
  } = post || {};
  const [loading, setLoading] = useState(false);

  let imageUrl = "";
  if (post && post.user && post.user.imageUrl) {
    imageUrl = post.user.imageUrl;
  }

  const [isLiked, setIsLiked] = useState(
    authProfile && authProfile.userFavoritePosts.find((item) => item.id === id)
  );
  const [totalLike, setTotalLike] = useState(reactions && reactions.length);

  // update reaction of post
  const handleOnLike = () => {
    let userInfo = {};
    if (post.user) {
      userInfo = {
        id: post.user.id,
        imageUrl: post.user.imageUrl,
        firstName: post.user.firstName,
        lastName: post.user.lastName,
        githubUsername: post.user.githubUsername,
      };
    }
    if (status === "public") {
      likeReaction(
        id,
        categoryId,
        title,
        description,
        setIsLiked,
        setTotalLike,
        userInfo
      );
    }
  };

  useEffect(() => {
    setIsLiked(
      authProfile &&
        authProfile.userFavoritePosts.find((item) => item.id === id)
    );
  }, [handleOnLike, setIsLiked]);

  const handleOnReportPost = () => {
    setOpenReportModal(true);
    setAnchorEl(null);
  };

  const handleOnDelete = (postId) => {
    Swal.fire({
      title: `Are you sure to delete ?`,
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        setLoading(true);
        deletePost(setLoading, postId);
      }
    });
  };

  const totalComments = comments ? comments.length : 0;

  const isPrivate = post && status === "private";

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              onClick={() => history.push(`/user-profile/${post.userId}`)}
              aria-label="recipe"
              className={classes.avatar}
              src={imageUrl || BASE_IMAGE_URL}
            ></Avatar>
          }
          action={
            <>
              {isPrivate && (
                <Tooltip title="Private">
                  <IconButton aria-label="delete">
                    <LockIcon />
                  </IconButton>
                </Tooltip>
              )}
              {!isCurrentAuth && (
                <>
                  <IconButton
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>

                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={() => handleOnReportPost()}>
                      Report this post
                    </MenuItem>
                  </Menu>
                </>
              )}
            </>
          }
          title={
            post && post.user && post.user.firstName && post.user.lastName
              ? post.user.firstName + " " + post.user.lastName
              : post.user.username
          }
          subheader={moment(createdAt).format("LLLL")}
        />

        <Typography
          variant="subtitle1"
          color="colorPrimary"
          style={{ fontSize: "18px" }}
          component="p"
          className="ml-3"
        >
          {title}
        </Typography>
        <CardContent className="p-0">
          <ViewText
            textBody={truncateMultilineString(description, 350)}
            className="viewMode"
          />
        </CardContent>
        <CardActions disableSpacing>
          <span className="like" style={{ color: Colors.green }}>
            {post.view} {post.view > 1 ? "views" : "view"}
          </span>
          <Tooltip title="Like">
            <IconButton
              style={{ color: isLiked || liked ? Colors.like : "" }}
              aria-label="add to favorites"
              onClick={() => handleOnLike()}
            >
              <FavoriteIcon />
              <span className="like">{liked ? "" : totalLike}</span>
            </IconButton>
          </Tooltip>
          {!liked && (
            <Tooltip title="Comment">
              <IconButton
                aria-label="comment"
                style={{ color: Colors.comment }}
              >
                <ChatIcon />
                <span className="like">{totalComments}</span>
              </IconButton>
            </Tooltip>
          )}

          {isCurrentAuth && (
            <>
              <Tooltip title="Edit">
                <IconButton
                  aria-label="edit"
                  style={{ color: Colors.edit }}
                  onClick={
                    () => post && history.push(`/edit-post/${id}`)
                    // window.open(`/edit-post/${id}`, "_blank")
                  }
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>

              {window.location.pathname.includes("user-profile") && (
                <Tooltip title="Delete">
                  <IconButton
                    aria-label="detete"
                    onClick={() => handleOnDelete(id)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              )}
            </>
          )}

          <IconButton
            className={classes.expand}
            style={{ fontSize: "16px" }}
            onClick={() => post && history.push(`/view-post/${id}`)}
            aria-label="show more"
          >
            MORE
          </IconButton>
        </CardActions>
      </Card>
      <ReportModal
        postId={post && id}
        modal={openReportModal}
        setModal={setOpenReportModal}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  authProfile: state.user_profile.user_profile,
  authId: state.auth.user.id,
});
export default connect(mapStateToProps, { likeReaction, deletePost })(PostCard);
