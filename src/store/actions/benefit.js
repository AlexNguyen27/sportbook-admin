import logoutDispatch from "../../utils/logoutDispatch";
import {
  GET_ERRORS,
  CLEAR_ERRORS,
  BASE_URL,
  GET_BENEFITS,
  ADD_BENEFIT,
  DELETE_BENEFIT,
  EDIT_BENEFIT,
} from "./types";
import { hera } from "hera-js";
import { arrayToObject } from "../../utils/commonFunction";
import Swal from "sweetalert2";
import { BENEFIT_STATUS } from "../../utils/common";

export const getBenefits = (setLoading) => async (dispatch, getState) => {
  const { token, isAdmin } = getState().auth;

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
                  benefits {
                      id, 
                      title,
                      status
                      createdAt
                    }
              }
          `,
    variables: {},
  });
  if (!errors) {
    let benefitArr = [...data.benefits];
    if (!isAdmin) {
      benefitArr = benefitArr.filter(
        (item) => item.status === BENEFIT_STATUS.enabled
      );
    }

    const benefits = arrayToObject(benefitArr);

    dispatch({
      type: GET_BENEFITS,
      benefits,
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

export const addBenefit = (setLoading, newData) => async (
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
            createBenefit(title: $title, status: $status) {
            id, 
            title,
            status
            createdAt
          }
        } 
      `,
    variables: {
      ...newData,
      status: newData.status || BENEFIT_STATUS.enabled,
    },
  });

  if (!errors) {
    dispatch({
      type: CLEAR_ERRORS,
    });

    dispatch({
      type: ADD_BENEFIT,
      benefit: data.createBenefit,
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
    console.log(errors);
    logoutDispatch(dispatch, errors);
    Swal.fire({
      position: "center",
      type: "Warning",
      title: "Title must be unique",
      showConfirmButton: false,
      timer: 1500,
    });
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};

// can not delete benefit
export const deleteBenefit = (setLoading, id) => async (dispatch, getState) => {
  const { token } = getState().auth;
  const { errors } = await hera({
    options: {
      url: BASE_URL,
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
    query: `
        mutation {
          deleteBenefit(id: $id) {
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
      type: DELETE_BENEFIT,
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
    Swal.fire({
      position: "center",
      type: "Warning",
      title: "Can't delete this benefit cuz it has posts!",
      showConfirmButton: false,
      timer: 1500,
    });
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};

export const updateBenefit = (setLoading, { title, id, status }) => async (
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
         updateBenefit(id: $id, title: $title, status: $status) {
            id
            title
            status
            createdAt
          }
        } 
      `,
    variables: {
      id,
      title,
      status: status || BENEFIT_STATUS.enabled,
    },
  });
  if (!errors) {
    dispatch({
      type: CLEAR_ERRORS,
    });

    dispatch({
      type: EDIT_BENEFIT,
      benefit: data.updateBenefit,
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
