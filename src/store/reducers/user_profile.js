import {
  GET_USER_PROFILE,
  UNAUTHENTICATE,
  GET_FRIEND_PROFILE,
  FOLLOW_UNFOLLOW,
  LIKE_REACTION,
  DELETE_POST,
} from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, user_profile, friend_profile } = action;
  switch (type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        user_profile,
      };
    case GET_FRIEND_PROFILE:
      return {
        ...state,
        friend_profile,
      };
    case DELETE_POST: 
      const { selectedId } = action;
      const newPosts = state.user_profile.posts.filter(item => item.id !== selectedId);
      return {
        ...state,
        user_profile: {
          ...state.user_profile,
          posts: newPosts
        }
      }
    case FOLLOW_UNFOLLOW:
      const { followed } = state.user_profile;
      const { isFollow, toUserId } = action;
      let newFollowArr = followed;
      // add to arr
      if (isFollow) {
        // if new follow action will send new follow object
        // object has toUserId, fromUserId
        const { newFollowed } = action;
        newFollowArr.push(newFollowed);
      } else {
        // remove follow
        newFollowArr = followed.filter((item) => item.toUserId !== toUserId);
        if (!newFollowArr) {
          newFollowArr = [];
        }
      }
      return {
        ...state,
        user_profile: {
          ...state.user_profile,
          followed: [...newFollowArr],
        },
      };
    case LIKE_REACTION:
      const {
        user_profile: { userFavoritePosts },
      } = state;
      const { postId, isLike } = action;

      let newFavoritePosts = userFavoritePosts;

      if (isLike) {
        const { newPost } = action;
        newFavoritePosts.push(newPost);
      } else {
        // remove follow
        newFavoritePosts = userFavoritePosts.filter(
          (item) => item.id !== postId
        );
        if (!newFavoritePosts) {
          newFavoritePosts = [];
        }
      }
      
      return {
        ...state,
        user_profile: {
          ...state.user_profile,
          userFavoritePosts: [...newFavoritePosts],
        },
      };
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
