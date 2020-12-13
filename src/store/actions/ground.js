import logoutDispatch from "../../utils/logoutDispatch";
import {
  GET_ERRORS,
  BASE_URL,
  CLEAR_ERRORS,
  ADD_GROUND,
  GET_GROUNDS,
  DELETE_GROUND,
  EDIT_GROUND,
  CLEAR_PRICE_SUB_GROUND,
} from "./types";
import { hera } from "hera-js";
import { arrayToObject } from "../../utils/commonFunction";
import Swal from "sweetalert2";
import { GROUND_STATUS } from "../../utils/common";

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
                    benefit
                    image,
                    status
                    address {
                      regionCode
                      districtCode
                      wardCode
                      address
                    }
                    createdAt 
                    categoryId
                    category {
                      id
                      name
                    }
                    user {
                      firstName
                      lastName
                      email
                      phone
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

    dispatch({
      type: CLEAR_PRICE_SUB_GROUND,
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
                benefit: $benefit   
                image: $image
                status: $status,
            ) {
                id
                title
                description
                phone
                status
                address {
                  regionCode
                  districtCode
                  wardCode
                  address
                }
                benefit
                image,
                createdAt
                categoryId
                category {
                  id
                  name
                }
            }
        } 
      `,
    variables: {
      ...groundData,
      address: {
        regionCode: groundData.regionCode,
        districtCode: groundData.districtCode,
        wardCode: groundData.wardCode,
        address: groundData.address,
      },
      status: groundData.status || GROUND_STATUS.public,
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
    logoutDispatch(dispatch, errors);
    if (errors[0].message === "Can not delete ground has orders!") {
      Swal.fire({
        position: "center",
        type: "Warning",
        title: errors[0].message,
        showConfirmButton: true,
      });
      setLoading(false);
    } else {
      Swal.fire({
        position: "center",
        type: "Warning",
        title: errors[0].message,
        showConfirmButton: true,
      });
    }
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};

export const updateGround = (setLoading, groundData) => async (
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
       updateGround(
          id: $id
          title: $title,
          description: $description
          phone: $phone
          address: $address
          categoryId: $categoryId
          benefit: $benefit   
          image: $image
          status: $status
         ) {
          id
          title
          description
          phone
          status
          address {
            regionCode
            districtCode
            wardCode
            address
          }
          benefit
          image,
          createdAt
          categoryId
          category {
            id
            name
          }
        }
      } 
    `,
    variables: {
      ...groundData,
      address: {
        regionCode: groundData.regionCode,
        districtCode: groundData.districtCode,
        wardCode: groundData.wardCode,
        address: groundData.address,
      },
      status: groundData.status || GROUND_STATUS.public,
    },
  });
  if (!errors) {
    dispatch({
      type: CLEAR_ERRORS,
    });

    dispatch({
      type: EDIT_GROUND,
      ground: data.updateGround,
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
    Swal.fire({
      position: "center",
      type: "Warning",
      title: errors[0].message || "An error occurred!",
      showConfirmButton: true,
    });
    setLoading(false);
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};
