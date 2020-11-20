import logoutDispatch from "../../utils/logoutDispatch";
import { GET_ERRORS, CLEAR_ERRORS, AUTHENTICATE, BASE_URL } from "./types";
import { hera } from "hera-js";

import Swal from "sweetalert2";
import { ROLE } from "../../utils/common";    
//LOGIN User
export const loginUser = ({ email, password }) => async (dispatch) => {
  // try {
  // const res = await axios.post('', data: {});
  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
    },
    query: `
        query {
          login(email: $email, password: $password) {
            id,
            token,
            email,
            firstName,
            lastName,
            email,
            gender,
            phone,
            address,
            dob,
            avatar,
            role,
            favoriteFoot
            playRole
            createdAt,
            updatedAt
          }
        }
      `,
    variables: {
      email,
      password,
    },
  });
  if (errors) {
    // If login fails, set user info to null
    logoutDispatch(dispatch, errors);
    // Set errors
    dispatch({
      type: GET_ERRORS,
      errors: { message: errors[0].message },
    });
  } else {
    const resData = data.login;
    const { token } = resData;
    const userData = { ...resData };
    delete userData.token;

    if (resData.role === ROLE.owner) {
      userData.isManager = true;
    } else if (resData.role === ROLE.admin) {
      userData.isAdmin = true;
    } else if (resData.role === ROLE.user) {
      logoutDispatch(dispatch);
      // Set errors
      dispatch({
        type: GET_ERRORS,
        errors: { message: "Email or password is incorrect!" },
      });
      return;
    }

    dispatch({
      type: AUTHENTICATE,
      user: {
        userInfo: userData,
        isManager: userData.isManager || false,
        isAdmin: userData.isAdmin || false,
      },
      token,
    });
  }
};

//Logout User
export const logoutUser = () => (dispatch) => {
  // Set user info to null
  logoutDispatch(dispatch);
};

// Sign up User
export const signUpUser = (isAuthenticated, history, userData) => async (
  dispatch
) => {
  const { email, password } = userData;
  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
    },
    query: `
        mutation {
          createUser(email: $email, password: $password, role: $role ) {
            id,
            email,
            firstName,
            lastName,
            phone,
            gender,
            address,
            dob,
            avatar,
            role,
            favoriteFoot
            playRole
            createdAt,
            updatedAt
          }
        }
      `,
    variables: {
      email,
      password,
      role: "owner",
    },
  });
  if (errors) {
    const formatedError = {};
    const error = errors[0].message;
    if (error.includes("Password")) {
      formatedError.password = error;
    }
    if (error.includes("Email")) {
      formatedError.email = error;
    }

    dispatch({
      type: GET_ERRORS,
      errors: { ...formatedError },
    });
  } else {
    dispatch({
      type: CLEAR_ERRORS,
    });
    // using sweetalert2
    Swal.fire({
      position: "center",
      type: "success",
      title: "Login to continue",
      showConfirmButton: false,
      timer: 1500,
    });

    if (!isAuthenticated) {
      history.push("/login");
    }
  }
};
