import {
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_USERS,
  DELETE_USER,
  EDIT_USER,
  BASE_URL,
  EDIT_USER_INFO,
  UPLOAD_AVATAR,
  UPLOAD_MOMO_QR_CODE,
  SAVE_CURRENT_USER,
} from "./types";
import { arrayToObject } from "../../utils/commonFunction";
import { hera } from "hera-js";
import Swal from "sweetalert2";
import logoutDispatch from "../../utils/logoutDispatch";
import { ROLE } from "../../utils/common";

export const getUsers = ({ role }, setLoading) => async (
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
          query {
            users(role: $role){
              id
              email
              firstName
              lastName
              phone
              role
              status
              gender
              address
              dob
              avatar
              socialNetwork
              extraInfo
              createdAt
              updatedAt
            }
          }
        `,
    variables: {
      role,
    },
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
export const getUserInfo = (userId, setLoading) => async (
  dispatch,
  getState
) => {
  const {
    token,
    user: { id: authUserId, role },
  } = getState().auth;

  // manager role
  if (role === ROLE.owner) {
    userId = authUserId;
  }

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
            getUserById(id: $id) {
              id,
              email,
              firstName,
              lastName,
              email,
              gender,
              phone,
              address,
              status
              dob,
              avatar,
              role,
              socialNetwork
              extraInfo
              momoQRCode
              createdAt,
              updatedAt
            }   
          }
        `,
    variables: {
      id: userId,
    },
  });

  if (!errors) {
    // if (authUserId === userId) {
    dispatch({
      type: SAVE_CURRENT_USER,
      currentUser: data.getUserById,
    });
    // }

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
            ${userId ? `id: ${userId}` : ""} 
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

export const editUserInfo = (setLoading, userData, userId) => async (
  dispatch,
  getState
) => {
  const state = getState();
  const {
    auth: {
      token,
      isAdmin,
      user: { id: authId },
    },
  } = state;

  const {
    firstName,
    lastName,
    address,
    dob,
    email,
    phone,
    gender,
    regionCode,
    districtCode,
    wardCode,
  } = userData;
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
              email: $email,
              dob: $dob,
              address: $address
              regionCode: $regionCode,
              districtCode: $districtCode, 
              wardCode: $wardCode
              gender: $gender
              extraInfo: $extraInfo
              socialNetwork: $socialNetwork,
              ${userData.status && isAdmin ? "status: $status" : ""}
              ) {
                id
                email
                firstName
                lastName
                phone
                gender
                address
                role
                dob
                avatar
                momoQRCode
                extraInfo
                socialNetwork
                createdAt
                updatedAt
                status
            }
          }
        `,
    variables: {
      id: userId,
      firstName,
      lastName,
      phone,
      dob,
      address,
      email,
      regionCode,
      districtCode,
      wardCode,
      gender,
      extraInfo: {
        ...userData.extraInfo,
      },
      socialNetwork: {
        ...userData.socialNetwork,
      },
      status: isAdmin && userData.status ? userData.status : null,
    },
  });

  if (!errors) {
    const res = data.updateUser;
    dispatch({
      type: EDIT_USER,
      selectedId: res.id,
      newUser: res,
    });
    console.log(authId, userId);
    if (authId === userId) {
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
    const error = errors[0].extensions.payload
      ? errors[0].extensions.payload
      : errors[0].message;
    const formatedError = {};
    if (errors[0].extensions.payload) {
      Object.keys(error).map((key) => {
        formatedError[key] = error[key].message;
      });
    }

    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: { ...formatedError },
    });
    setLoading(false);
  }
};

//
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

//
export const uploadAvatar = (setLoading, avatar, userId) => async (
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
            uploadAvatar(
              avatar: $avatar
              userId: $userId
            ) {
              id
              avatar
            }
          }
        `,
    variables: {
      avatar,
      userId,
    },
  });

  if (!errors) {
    dispatch({
      type: UPLOAD_AVATAR,
      uploadData: {
        userId,
        avatar,
      },
    });

    dispatch({
      type: CLEAR_ERRORS,
    });

    setLoading(false);
    Swal.fire({
      position: "center",
      type: "success",
      title: "Uploaded successfully!",
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

export const uploadMomoQRCode = (setLoading, momoQRCode, userId) => async (
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
            uploadMomoQRCode(
              momoQRCode: $momoQRCode
            ) {
              id
              momoQRCode
            }
          }
        `,
    variables: {
      momoQRCode,
    },
  });

  if (!errors) {
    dispatch({
      type: UPLOAD_MOMO_QR_CODE,
      uploadData: {
        userId,
        momoQRCode,
      },
    });

    dispatch({
      type: CLEAR_ERRORS,
    });

    setLoading(false);
    Swal.fire({
      position: "center",
      type: "success",
      title: "Uploaded successfully!",
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

export const checkExitsEmail = (setLoading, email, setIsExitsEmail) => async (
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
          query {
            checkExitsEmail(email: $email) {
              status
              hashPassword
            }
          }
        `,
    variables: {
      email,
    },
  });

  if (!errors) {
    dispatch({
      type: CLEAR_ERRORS,
    });

    setLoading(false);
    setIsExitsEmail({ ...data.checkExitsEmail });
    return;
  } else {
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};
