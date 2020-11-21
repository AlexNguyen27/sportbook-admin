import logoutDispatch from "../../utils/logoutDispatch";
import {
  GET_ERRORS,
  BASE_URL,
  GET_BENEFITS,
  CLEAR_ERRORS,
  ADD_GROUND,
  GET_GROUNDS,
  DELETE_GROUND,
} from "./types";
import { hera } from "hera-js";
import { arrayToObject } from "../../utils/commonFunction";
import Swal from "sweetalert2";

export const getGrounds = (setLoading) => async (dispatch, getState) => {
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
                grounds {
                    id
                    title 
                    description
                    phone
                    address,
                    benefit
                    image,
                    createdAt 
                    category {
                      id
                      name
                    }
                }
              }
          `,
    variables: {},
  });
  if (!errors) {
    const grounds = arrayToObject(data.grounds);

    dispatch({
      type: GET_GROUNDS,
      grounds,
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

export const addGround = (setLoading, groundData) => async (
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
            createGround(
                title: $title,
                description: $description
                phone: $phone
                address: $address
                categoryId: $categoryId
                regionCode: $regionCode
                districtCode: $districtCode
                wardCode: $wardCode
                benefit: $benefit   
            ) {
                id
                title
                description
                phone
                address,
                benefit
                image,
                category {
                  id
                  name
                }
                user {
                  id
                  email
                }
            }
        } 
      `,
    variables: {
      ...groundData,
    },
  });

  if (!errors) {
    dispatch({
      type: CLEAR_ERRORS,
    });

    dispatch({
      type: ADD_GROUND,
      ground: data.createGround,
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

export const deleteGround = (setLoading, id) => async (dispatch, getState) => {
  const { token } = getState().auth;
  console.log('er----------------', id);
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
        deleteGround(id: $id) {
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
      type: DELETE_GROUND,
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

