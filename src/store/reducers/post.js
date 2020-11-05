import {
  UNAUTHENTICATE,
  GET_POSTS,
  EDIT_POST,
  ADD_POST,
  DELETE_POST,
  GET_SELECTED_POST,
  REACTION_SELECTED_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
} from "../actions/types";

const initialState = {
  posts: {},
  selected_post: {},
};

export default function (state = initialState, action) {
  const { type, posts, selectedId, post } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: { ...posts },
      };
    case ADD_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [post.id]: post,
        },
      };
    case EDIT_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [post.id]: { ...state.posts[post.id], ...post },
        },
      };

    case DELETE_POST:
      const newPosts = state.posts;
      delete newPosts[selectedId];
      return {
        ...state,
        posts: newPosts,
      };

    // ACTION FOR SELECTED POST
    case GET_SELECTED_POST:
      return {
        ...state,
        selected_post: post,
      };
    case REACTION_SELECTED_POST:
      const { isLike, newReactonLike, userId } = action;
      const { reactions } = state.selected_post;
      let newReactions;
      if (isLike) {
        newReactions = [...reactions, newReactonLike];
      } else {
        newReactions = reactions.filter((item) => item.userId !== userId);
      }

      if (!newReactions) {
        newReactions = [];
      }

      return {
        ...state,
        selected_post: {
          ...state.selected_post,
          reactions: newReactions,
        },
      };

    // COMMENT AT SELECTED POST
    case ADD_COMMENT:
      const newComment = action.comment;
      return {
        ...state,
        selected_post: {
          ...state.selected_post,
          comments: [...state.selected_post.comments, newComment],
        },
      };
    case EDIT_COMMENT:
      const editComment = action.comment;
      const oldCommentArr = state.selected_post.comments;
      const selectedIndex = oldCommentArr.findIndex(
        (item) => item.id === editComment.id
      );
      oldCommentArr[selectedIndex] = editComment;
      return {
        ...state,
        selected_post: {
          ...state.selected_post,
          comments: oldCommentArr,
        },
      };
    case DELETE_COMMENT:
      const { commentId } = action;
      let newCommentArr = state.selected_post.comments.filter(
        (item) => item.id !== commentId
      );
      if (!newCommentArr) {
        newCommentArr = [];
      }
      return {
        ...state,
        selected_post: {
          ...state.selected_post,
          comments: newCommentArr,
        },
      };
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
