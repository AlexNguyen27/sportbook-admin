import logoutDispatch from "../../utils/logoutDispatch";
import { GET_ERRORS, CLEAR_ERRORS, AUTHENTICATE, BASE_URL } from "./types";
import { hera } from "hera-js";

import Swal from "sweetalert2";
import { ROLE } from "../../utils/common";
//LOGIN User
export const loginUser = ({ email, password, hashPassword }) => async (
  dispatch
) => {
  const query = !hashPassword
    ? "password: $password"
    : "hashPassword: $hashPassword";

  const variables = !hashPassword
    ? { email, password }
    : { email, hashPassword };
  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
    },
    query: `
        query {
          login(email: $email, ${query}) {
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
            momoQRCode,
            extraInfo
            socialNetwork
            createdAt,
            updatedAt
          }
        }
      `,
    variables: {
      ...variables,
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
    dispatch({
      type: GET_ERRORS,
      errors: { message: "Email or password is incorrect!" },
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
      Swal.fire({
        position: "center",
        type: "Warning",
        title: "Email already exits!",
        showConfirmButton: false,
        timer: 1500,
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
  const { email, password, firstName, lastName } = userData;
  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
    },
    query: `
        mutation {
          createUser(email: $email, password: $password, role: $role, firstName: $firstName, lastName: $lastName) {
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
            momoQRCode,
            socialNetwork 
            extraInfo
            createdAt,
            updatedAt
          }
        }
      `,
    variables: {
      email,
      password,
      firstName,
      lastName,
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

export const loginWithGoogle = (setLoading, setModal, userData) => async (
  dispatch
) => {
  const { email, password, firstName, lastName, avatar } = userData;
  console.log("herer-----------------", userData);
  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
    },
    query: `
        mutation {
          createUser(
              email: $email,
              password: $password, 
              role: $role,
              firstName: $firstName,
              lastName: $lastName,
              avatar: $avatar,
            ) {
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
            socialNetwork 
            extraInfo
            createdAt,
            updatedAt
          }
        }
      `,
    variables: {
      email,
      password,
      firstName,
      lastName,
      avatar,
      role: "owner",
    },
  });
  if (errors) {
    console.log("register error-=========", errors);
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
    const { data: loginData, errors: loginErrors } = await hera({
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
              momoQRCode,
              extraInfo
              socialNetwork
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
      logoutDispatch(dispatch, loginErrors);
      // Set errors
      dispatch({
        type: GET_ERRORS,
        errors: { message: loginErrors[0].message },
      });
    } else {
      const resData = loginData.login;
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
    // close modal
    setModal(false);

    dispatch({
      type: CLEAR_ERRORS,
    });
  }

  setLoading(false);
};
