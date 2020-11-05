import logoutDispatch from "../../utils/logoutDispatch";
import { GET_ERRORS, CLEAR_ERRORS, BASE_URL, FOLLOW_UNFOLLOW } from "./types";
import { hera } from "hera-js";

// token provided => get fromUserId
export const followToUser = (toUserId, setConnect) => async (
  dispatch,
  getState
) => {
  const {
    token,
    user: { id: fromUserId },
  } = getState().auth;

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
            createFollower(toUserId: $toUserId) {
                status 
                message
              }
        }
      `,
    variables: {
      toUserId,
    },
  });

  if (!errors) {
    dispatch({
      type: CLEAR_ERRORS,
    });

    if (data.createFollower.message.includes("Unfollow")) {
      setConnect(false);
      dispatch({
        type: FOLLOW_UNFOLLOW,
        isFollow: false,
        toUserId
      });
    } else {
      setConnect(true);
      const newFollowed = {
        toUserId,
        fromUserId,
      };
      dispatch({
        type: FOLLOW_UNFOLLOW,
        isFollow: true,
        newFollowed,
      });
    }
  } else {
    console.log(errors);
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};
