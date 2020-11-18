import {
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_USERS,
  DELETE_USER,
  EDIT_USER,
  BASE_URL,
  GET_USER_PROFILE,
  GET_FRIEND_PROFILE,
  EDIT_USER_INFO,
  GET_GITHUB_AVATAR,
  GET_CURRENT_USER_AVATAR,
  BASE_IMAGE_URL,
} from "./types";
import { arrayToObject } from "../../utils/commonFunction";
import { hera } from "hera-js";
import Swal from "sweetalert2";
import logoutDispatch from "../../utils/logoutDispatch";
import Axios from "axios";
import moment from 'moment';

// GET majors data
export const getUsers = (setLoading) => async (dispatch, getState) => {
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
            users{
              id
              email
              firstName
              lastName
              phone
              gender
              address
              dob
              avatar
              favoriteFoot
              playRole
            }
          }
        `,
    variables: {},
  });

  if (!errors) {
    const usersListObj = arrayToObject(data.users);

    dispatch({
      type: GET_USERS,
      users: usersListObj,
    });

    setLoading(false);
  } else {
    console.log(errors);
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};

// GET majors data
export const getUserProfile = (userId, setLoading) => async (
  dispatch,
  getState
) => {
  const {
    token,
    user: { id: authUserId },
  } = getState().auth;

  // const { data, errors } = await hera({
  //   options: {
  //     url: BASE_URL,
  //     headers: {
  //       token,
  //       "Content-Type": "application/json",
  //     },
  //   },
  //   query: `
  //         query {
  //           getUserProfile(userId: $userId) {
  //             id
  //             username
  //             firstName,
  //             lastName,
  //             quote
  //             email,
  //             phone,
  //             address,
  //             githubUsername,
  //             imageUrl
  //             totalFollowers
  //             posts {
  //               id
  //               title,
  //               description
  //               status
  //               userId
  //               view
  //               user {
  //                 id
  //                 username
  //                 imageUrl
  //                 firstName
  //                 lastName
  //                 githubUsername
  //               }
  //               categoryId
  //               createdAt
  //               updatedAt
  //               comments {
  //                 id
  //                 comment
  //                 userId
  //                 parentId
  //                 createdAt
  //                 updatedAt
  //               }
  //               reactions {
  //                 userId
  //                 reactionTypeId
  //                 postId
  //               }
  //             }
  //             followed {
  //               fromUserId,
  //               toUserId
  //               createdAt
  //             }
  //             userFavoritePosts {
  //               id
  //               userId
  //               categoryId
  //               title
  //               view
  //               user {
  //                 id
  //                 imageUrl
  //                 firstName
  //                 lastName
  //                 githubUsername
  //               }
  //               description
  //               reactions {
  //                 userId
  //                 reactionTypeId
  //                 postId
  //               }
  //               comments {
  //                 id
  //                 comment
  //                 userId
  //                 parentId
  //               }
  //             }
  //           }
  //         }
  //       `,
  //   variables: {
  //     userId,
  //   },
  // });

  // if (!errors) {
  //   if (authUserId === userId) {
  //     dispatch({
  //       type: GET_USER_PROFILE,
  //       user_profile: data.getUserProfile,
  //     });
  //   } else {
  //     dispatch({
  //       type: GET_FRIEND_PROFILE,
  //       friend_profile: data.getUserProfile,
  //     });
  //   }

  //   setLoading(false);
  // } else {
  //   console.log(errors);
  //   logoutDispatch(dispatch, errors);
  //   dispatch({
  //     type: GET_ERRORS,
  //     errors: errors[0].message,
  //   });
  // }
};

export const updatePassword = (
  setLoading,
  currentPassword,
  newPassword,
  confirmPassword,
  userId
) => async (dispatch, getState) => {
  const state = getState();
  const {
    auth: {
      token,
      user: { id: authId },
    },
  } = state;

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
          changePassword(
            ${userId ? `userId: ${userId}` : ""} 
            currentPassword: $currentPassword, 
            newPassword: $newPassword, 
            confirmPassword: $confirmPassword
          ) {
            status
            message
          }
        }
      `,
    variables: {
      currentPassword,
      newPassword,
      confirmPassword,
    },
  });

  if (!errors) {
    dispatch({
      type: CLEAR_ERRORS,
    });

    setLoading(false);
    Swal.fire({
      position: "center",
      type: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    setLoading(false);

    const { message } = errors[0];

    const error = {};
    if (message.includes("Current password")) {
      error.currentPassword = message;
    } else if (message.includes("Password")) {
      error.newPassword = message;
    } else if (message.includes("Confirm password")) {
      error.confirmPassword = message;
    } else {
      Swal.fire({
        position: "center",
        type: "Error",
        title: message,
        showConfirmButton: true,
      });
    }

    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: { ...error },
    });
  }
};

export const editUserInfo = (setLoading, userData) => async (
  dispatch,
  getState
) => {
  const state = getState();
  const {
    auth: {
      token,
      user: { id: userId },
    },
  } = state;
  const { user } = state;
  console.log(userData)

  const { firstName, lastName, address, dob, email, favoriteFoot, phone, playRole, gender } = userData;
  
  console.log(`'${JSON.stringify(address)}'`)
  try {
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
            updateUser(
              id: $id,
              firstName: $firstName,
              lastName: $lastName,
              phone: $phone, 
              gender: $gender,
              dob: $dob,
              address: $address
              ) {
                id
                email
                firstName
                lastName
                phone
                gender
                address
                dob
                avatar
                playRole
                createdAt
                updatedAt
            }
          }
        `,
      variables: {
        id: userId,
        firstName,
        lastName,
        phone,
        gender,
        dob,
        address: `'${JSON.stringify(address)}'`,
      },
    });
  
    if (!errors) {
      const res = data.updateUser;
      dispatch({
        type: EDIT_USER,
        selectedId: res.id,
        newUser: res,
      });
      if (res.id === userId) {
        dispatch({
          type: EDIT_USER_INFO,
          newUser: res,
        });
      }
      dispatch({
        type: CLEAR_ERRORS,
      });
  
      setLoading(false);
      Swal.fire({
        position: "center",
        type: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      console.log(errors);
      const error = errors[0].extensions.payload
        ? errors[0].extensions.payload
        : errors[0].message;
      const formatedError = {};
      errors[0].extensions.payload &&
        Object.keys(error).map((key) => {
          formatedError[key] = error[key].message;
        });
  
      logoutDispatch(dispatch, errors);
      dispatch({
        type: GET_ERRORS,
        errors: { ...formatedError },
      });
    }
  } catch(error) {
    console.log('err-----------------------', error);
  }
  
};

// DELETE GROUP
export const deleteUser = (setLoading, userId) => async (
  dispatch,
  getState
) => {
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
          mutation {
            deleteUser(id: $id) {
             status
             message
            }
          }
        `,
    variables: {
      id: userId,
    },
  });

  if (!errors) {
    dispatch({
      type: DELETE_USER,
      selectedId: userId,
    });

    dispatch({
      type: CLEAR_ERRORS,
    });

    setLoading(false);
    // using sweetalert2
    Swal.fire({
      position: "center",
      type: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};

export const getGithubProfile = (userId, githubUsername) => async (
  dispatch,
  getState
) => {
  try {
    const state = getState();
    const gitHubInfo = await Axios.get(
      `https://api.github.com/users/${githubUsername}/repos?per_page=5&sort=created:asc`
    );

    if (gitHubInfo.data.length > 0) {
      if (state.auth.user.id === userId) {
        dispatch({
          type: GET_GITHUB_AVATAR,
          imageUrl: gitHubInfo.data[0].owner.avatar_url,
        });
      }
      // UPDATE CURRENT USER DATA
      if (state.auth.isAdmin) {
        dispatch({
          type: GET_CURRENT_USER_AVATAR,
          imageUrl: gitHubInfo.data[0].owner.avatar_url,
        });
      }
    }
    console.log(gitHubInfo);
  } catch (error) {
    console.log(error);
  }
};
