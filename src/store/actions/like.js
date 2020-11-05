import logoutDispatch from "../../utils/logoutDispatch";
import {
  GET_ERRORS,
  CLEAR_ERRORS,
  BASE_URL,
  LIKE_REACTION,
  EDIT_POST,
  GET_REACTION_TYPE,
  REACTION_SELECTED_POST,
} from "./types";
import { hera } from "hera-js";
import { arrayToObject } from "../../utils/commonFunction";

export const likeReaction = (
  postId,
  categoryId,
  title,
  description,
  setIsLiked,
  setTotalLike,
  userInfo
) => async (dispatch, getState) => {
  const state = getState();
  const {
    token,
    user: { id: userId },
  } = state.auth;
  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
    query: `
        mutation {
            createReaction(
                userId: $userId, 
                postId: $postId, 
                reactionTypeId: "9d31b9c1-e375-4dc5-9335-0c8879695163") 
                {
                    status
                    message
                }
        }
      `,
    variables: {
      userId,
      postId,
    },
  });

  if (!errors) {
    dispatch({
      type: CLEAR_ERRORS,
    });

    const reactionTypes = state.reactionType.reactionTypes;
    // GET REACTION TYPE LIKE
    let reactionTypeId = "";
    Object.keys(reactionTypes).map((key) => {
      if (reactionTypes[key].name === "like") {
        reactionTypeId = key;
      }
    });
    const { posts, selected_post } = state.post;
    // REACTION AT SELECTED POST
    if (data.createReaction.message.includes("Delete")) {
      dispatch({
        type: LIKE_REACTION,
        isLike: false,
        postId,
      });
      setIsLiked(false);
      setTotalLike((prev) => prev - 1);

      const { reactions = [] } = posts[postId] || selected_post;
      const deletedReactionArr = reactions.filter(
        (item) => item.userId !== userId
      );

      if (JSON.stringify(selected_post) !== "{}") {
        dispatch({
          type: REACTION_SELECTED_POST,
          isLike: false,
          userId,
        });
      }

      dispatch({
        type: EDIT_POST,
        post: {
          ...posts[postId],
          reactions: deletedReactionArr || [],
        },
      });
    } else {
      const newPost = {
        id: postId,
        userId: userId,
        categoryId,
        title,
        description,
        user: userInfo,
      };
      // FOR FAVORITE TABSS
      dispatch({
        type: LIKE_REACTION,
        isLike: true,
        postId,
        newPost,
      });
      setTotalLike((prev) => prev + 1);
      setIsLiked(true);

      const newReaction = {
        postId,
        userId,
        reactionTypeId,
      };
      const { reactions = [] } = posts[postId] || selected_post;

      dispatch({
        type: EDIT_POST,
        post: {
          ...posts[postId],
          reactions: [...reactions, newReaction],
        },
      });
      if (JSON.stringify(selected_post) !== "{}") {
        const newReactonLike = {
          userId,
          postId,
          reactionTypeId,
        };
        dispatch({
          type: REACTION_SELECTED_POST,
          isLike: true,
          newReactonLike,
        });
      }
    }
  } else {
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};

export const getReactionTypes = (setLoading) => async (dispatch, getState) => {
  const { token } = getState().auth;

  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
    query: `
            query {
              getReactionTypes {
                id 
                name
              }
            }
        `,
    variables: {},
  });
  if (!errors) {
    const reactionTypes = arrayToObject(data.getReactionTypes);

    dispatch({
      type: GET_REACTION_TYPE,
      reactionTypes,
    });
    setLoading(false);
  } else {
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};
