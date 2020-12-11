import logoutDispatch from "../../utils/logoutDispatch";
import {
  GET_ERRORS,
  BASE_URL,
  CLEAR_ERRORS,
  GET_SUB_GROUNDS,
  ADD_SUB_GROUND,
  DELETE_SUB_GROUND,
  EDIT_SUB_GROUND,
  CLEAR_PRICE_SUB_GROUND,
} from "./types";
import { hera } from "hera-js";
import { arrayToObject } from "../../utils/commonFunction";
import Swal from "sweetalert2";

export const getSubGrounds = (setLoading, groundId) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: CLEAR_PRICE_SUB_GROUND,
  });
  
  const { token } = getState().auth;
  let subGroundQuery = "";
  let variables = {};
  if (groundId) {
    variables = { ...variables, groundId };
    subGroundQuery += "groundId: $groundId";
  }

  if (subGroundQuery.length > 0) {
    subGroundQuery = `(${subGroundQuery})`;
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
            subGrounds${subGroundQuery} {
              id
              name
              numberOfPlayers
              groundId
              createdAt
            }
          }
      `,
    variables: {
      ...variables,
    },
  });
  if (!errors) {
    const subGrounds = arrayToObject(data.subGrounds);

    dispatch({
      type: GET_SUB_GROUNDS,
      subGrounds,
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

export const addSubGround = (setLoading, subGroundData) => async (
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
            createSubGround(
                 name: $name,
                 numberOfPlayers: $numberOfPlayers
                 groundId: $groundId
              ) {
                id
                name
                numberOfPlayers
                groundId
                createdAt
              }
          } 
        `,
    variables: {
      ...subGroundData,
    },
  });

  if (!errors) {
    dispatch({
      type: CLEAR_ERRORS,
    });

    dispatch({
      type: ADD_SUB_GROUND,
      subGround: data.createSubGround,
    });
    setLoading(false);
    Swal.fire({
      position: "center",
      type: "success",
      title: "Added successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    logoutDispatch(dispatch, errors);
    setLoading(false);
    Swal.fire({
      position: "center",
      type: "Warning",
      title: "An error occurred!",
      showConfirmButton: false,
      timer: 1500,
    });
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};

export const deleteSubGround = (setLoading, id) => async (
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
          deleteSubGround(id: $id) {
            status,
            message
          }
        } 
      `,
    variables: {
      id,
    },
  });
  if (!errors) {
    dispatch({
      type: CLEAR_ERRORS,
    });

    dispatch({
      type: DELETE_SUB_GROUND,
      selectedId: id,
    });
    Swal.fire({
      position: "center",
      type: "success",
      title: "Deleted successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
    setLoading(false);
  } else {
    console.log(errors);
    logoutDispatch(dispatch, errors);
    Swal.fire({
      position: "center",
      type: "Warning",
      title: "Can't delete this ground cuz it has sub ground!",
      showConfirmButton: false,
      timer: 1500,
    });
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};

export const updateSubGround = (setLoading, subGroundData) => async (
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
       updateSubGround(
         id: $id
         name: $name
         groundId: $groundId
         numberOfPlayers: $numberOfPlayers
       ) {
        id
        name
        numberOfPlayers
        groundId
        createdAt
        }
      } 
    `,
    variables: {
      ...subGroundData,
    },
  });
  if (!errors) {
    dispatch({
      type: CLEAR_ERRORS,
    });

    dispatch({
      type: EDIT_SUB_GROUND,
      subGround: data.updateSubGround,
    });
    setLoading(false);
    Swal.fire({
      position: "center",
      type: "success",
      title: "Your work has been save!",
      showConfirmButton: false,
      timer: 1500,
    });
    setLoading(false);
  } else {
    console.log(errors);
    Swal.fire({
      position: "center",
      type: "Warning",
      title: "Please check the input!",
      showConfirmButton: false,
      timer: 1500,
    });
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};
