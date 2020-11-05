import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import moment from "moment";
import { makeStyles, formatMs } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { useHistory } from "react-router-dom";
import {
  Paper,
  Typography,
  Divider,
  Grid,
  IconButton,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import TextFieldInputWithHeader from "../../../../custom/TextFieldInputWithheader";
import { GET_ERRORS, BASE_IMAGE_URL } from "../../../../../store/actions/types";
import {
  addComment,
  deleteComment,
} from "../../../../../store/actions/comment";
import Swal from "sweetalert2";
import EditCommentModal from "./EditCommentModal";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const options = ["Edit", "Delete"];
const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
 
  },
  formRoot: {
    "& .MuiTextField-root": {
      // margin: theme.spacing(1),
    },
  },
  btnDelete: {
    fontSize: "12px !important",
    padding: 0,
    marginTop: "5px",
    marginBottom: "10px",
    marginRight: "10px",
    textDecoration: "underline",
  },
  iconSize: {
    fontSize: "16px !important",
    marginRight: "2px",
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

const CommentsList = ({
  comments,
  errors,
  addComment,
  postId,
  authId,
  deleteComment,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [comment, setComment] = useState("");
  const [replyComment, setReplyComment] = useState("");
  const [onEditModel, setOnEditModal] = useState();
  const [commentData, setCommentData] = useState();
  const [isReplyId, setIsReplyId] = useState();

  const onChange = (e) => {
    setComment(e.target.value);
  };

  const onChangeReplyComment = (e) => {
    setReplyComment(e.target.value);
  };

  const handleOnDelete = () => {
    setAnchorEl(null);
    Swal.fire({
      title: `Are you sure to delete this ?`,
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        setLoading(true);
        deleteComment(setLoading, commentData.id);
      }
    });
  };

  const handleOnEditComment = () => {
    setAnchorEl(null);
    setOnEditModal(true);
  };

  const handleOnReplyComment = (commentData) => {
    setIsReplyId(commentData.id);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, commentData) => {
    setCommentData(commentData);
    setAnchorEl(event.currentTarget);
  };

  const renderTree = (nodes) => (
    <>
      <Grid container spacing={1} >
        <Grid item>
          <Avatar
            className={classes.small}
            onClick={() => history.push(`/user-profile/${nodes.userId}`)}
            style={{ cursor: "pointer" }}
            alt="Remy Sharp"
            src={nodes.user.imageUrl || BASE_IMAGE_URL}
          />
        </Grid>
        <Grid item style={{ width: "80%" }}>
          <Grid container justify="flex-start">
            <Grid item>
              <Typography
                variant="body1"
                component="span"
                style={{ fontWeight: "bold", color: "#4d4c7d" }}
              >
                {nodes.user.firstName && nodes.user.lastName
                  ? nodes.user.firstName + " " + nodes.user.lastName
                  : nodes.user.username}
              </Typography>
            </Grid>
            {nodes.userId === authId && (
              <Grid item>
                <div>
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    className="p-0"
                    onClick={(e) => handleClick(e, nodes)}
                  >
                    <MoreVertIcon style={{ width: "20px" }} />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={() => setAnchorEl(null)}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch",
                        padding: "0px",
                      },
                    }}
                  >
                    <MenuItem
                      key="Edit"
                      onClick={() => {
                        handleOnEditComment(nodes);
                      }}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem
                      key="Delete"
                      onClick={() => {
                        handleOnDelete();
                      }}
                    >
                      Delete
                    </MenuItem>
                  </Menu>
                </div>
              </Grid>
            )}
          </Grid>

          <Typography
            variant="body1"
            component="span"
            className="pt-2 pb-2"
            style={{ color: "#393e46" }}
          >
            <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.comment}>
              {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
            </TreeItem>
          </Typography>
          <Grid container justify="flex-start">
            <Grid item>
              <IconButton
                aria-label="detete"
                className={classes.btnDelete}
                onClick={() => handleOnReplyComment(nodes)}
              >
                Reply
              </IconButton>
            </Grid>
            <Grid item style={{ marginTop: "4px" }}>
              <Typography variant="caption" style={{ color: "#393e46" }}>
                <span className="mr-2 mt-2">&spades;</span>
                {moment(nodes.updatedAt).format("DD/MM/YYYY HH:MM:ss")}
              </Typography>
            </Grid>
          </Grid>

          {isReplyId === nodes.id && (
            <Grid item xs={12} className="mb-3">
              <form
                onSubmit={(e) => onSubmitReplyComment(e)}
                className={classes.formRoot}
                autoComplete="off"
              >
                <TextFieldInputWithHeader
                  id="outlined-multiline-flexible"
                  name="comment"
                  label="Enter your reply comment"
                  fullWidth
                  variant="outlined"
                  value={replyComment}
                  onChange={onChangeReplyComment}
                  error={errors.replyComment}
                />
              </form>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );

  const formatData = (comments = []) => {
    const list = comments;
    const map = {};
    const roots = [];

    list.forEach((comment) => {
      const node = comment;
      node.children = false;
      map[node.id] = node;
    });

    // let indexChar = 0;
    list.forEach((comment) => {
      const node = comment;
      if (node.parentId) {
        const parent = map[node.parentId];
        if (parent) {
          if (parent && parent.children) {
            // node.no = `${latestNo}.${parent.children.length + 1}`;
            parent.children = [...parent.children, node];
          } else {
            // node.no = `${latestNo}.${1}`;
            parent.children = [node];
          }
        }
      } else {
        // node.no = String.fromCharCode(indexChar + 65);
        // indexChar += 1;
        roots.push(node);
      }
    });
    return roots;
  };

  const [loading, setLoading] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();

    let error = {};
    if (comment.trim() === "") {
      error.comment = "Enter your comment!";
    }

    dispatch({
      type: GET_ERRORS,
      errors: error,
    });

    if (JSON.stringify(error) === "{}") {
      setLoading(true);
      addComment(setLoading, comment, postId);
    }
    setComment("");
  };

  const onSubmitReplyComment = (e) => {
    e.preventDefault();

    let error = {};
    if (replyComment.trim() === "") {
      error.replyComment = "Enter your comment!";
    }

    dispatch({
      type: GET_ERRORS,
      errors: error,
    });

    if (JSON.stringify(error) === "{}") {
      setLoading(true);
      addComment(setLoading, replyComment, postId, isReplyId);
    }
    setReplyComment("");
  };

  const formatedComment = formatData(comments);

  const idComments = formatedComment.map(
    (item) => item.children && item.children.length > 0 && item.id
  );
  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={[...idComments].filter(Boolean)}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {formatedComment.map((item) => renderTree(item))}

      <Grid container className="mb-3">
        <Grid item xs={12}>
          <form
            onSubmit={(e) => onSubmit(e)}
            className={classes.formRoot}
            autoComplete="off"
          >
            <TextFieldInputWithHeader
              id="outlined-multiline-flexible"
              name="comment"
              label="Enter your Comment"
              fullWidth
              variant="outlined"
              value={comment}
              onChange={onChange}
              error={errors.comment}
            />
          </form>
        </Grid>
      </Grid>
      <EditCommentModal
        modal={onEditModel}
        setModal={setOnEditModal}
        commentData={commentData}
      />
    </TreeView>
  );
};

const mapStateToProps = (state) => ({
  comments: state.post.selected_post.comments,
  errors: state.errors,
  authId: state.auth.user.id,
});
export default connect(mapStateToProps, { addComment, deleteComment })(
  CommentsList
);
