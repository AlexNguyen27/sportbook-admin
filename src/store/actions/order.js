import logoutDispatch from "../../utils/logoutDispatch";
import {
  GET_ERRORS,
  BASE_URL,
  CLEAR_ERRORS,
  GET_ORDERS,
  ADD_ORDER,
  EDIT_ORDER_STATUS,
} from "./types";
import { hera } from "hera-js";
import { arrayToObject } from "../../utils/commonFunction";
import Swal from "sweetalert2";

export const getOrders = (setLoading) => async (dispatch, getState) => {
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
                  orders {
                    id
                    subGroundId
                    userId
                    startDay
                    startTime
                    endTime
                    paymentType
                    status
                    discount
                    price
                    subGround {
                        id
                        name
                    }
                    user {
                        id
                        firstName
                    }
                    createdAt
                    updatedAt
                  }
                }
            `,
    variables: {},
  });
  if (!errors) {
    const orders = arrayToObject(data.orders);

    dispatch({
      type: GET_ORDERS,
      orders,
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

export const getOrdersByUserId = (setLoading, userId) => async (
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
                  orders(userId: $userId) {
                    id
                    subGroundId
                    userId
                    startDay
                    startTime
                    endTime
                    paymentType
                    status
                    discount
                    price
                    subGround {
                        id
                        name
                    }
                    user {
                        id
                        firstName
                        lastName
                    }
                    createdAt
                    updatedAt
                  }
                }
            `,
    variables: {
      userId,
    },
  });
  if (!errors) {
    const orders = arrayToObject(data.orders);

    dispatch({
      type: GET_ORDERS,
      orders,
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

export const addOrder = (setLoading, orderData) => async (
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
            createOrder(
              subGroundId: $subGroundId
              startDay: $startDay
              startTime: $startTime
              endTime: $endTime
              paymentType: $paymentType
              price: $price
              discount: $discount
              ) {
                id
                subGroundId
                userId
                startDay
                startTime
                endTime
                paymentType
                status
                discount
                price
                subGround {
                  id
                  name
                }
                createdAt
                updatedAt
              }
          } 
        `,
    variables: {
      ...orderData,
    },
  });

  if (!errors) {
    dispatch({
      type: CLEAR_ERRORS,
    });

    dispatch({
      type: ADD_ORDER,
      order: data.createOrder,
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

    // TODO: update later
    const payloadError = errors[0]?.extensions?.payload || {};
    let error = {};
    Object.keys(payloadError).map((key) => {
      error[key] = payloadError[key].message;
    });

    const hasError = JSON.stringify(error) !== "{}";
    if (!hasError) {
      Swal.fire({
        position: "center",
        type: "Warning",
        title: errors[0].message || "An error occurred!",
        showConfirmButton: true,
      });
    } else {
      Swal.fire({
        position: "center",
        type: "Warning",
        title: "An error occurred!",
        showConfirmButton: true,
      });
    }

    dispatch({
      type: GET_ERRORS,
      errors: hasError ? error : errors[0].message,
    });
  }
};

export const updateOrderStatus = (setLoading, orderData) => async (
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
        updateOrderStatus(
         id: $id
          status: $status
       ) {
        status
        message
        }
      } 
    `,
    variables: {
      ...orderData,
    },
  });
  if (!errors) {
    dispatch({
      type: CLEAR_ERRORS,
    });

    dispatch({
      type: EDIT_ORDER_STATUS,
      orderData: {
        ...orderData,
      },
    });
  } else {
    Swal.fire({
      position: "center",
      type: "Warning",
      title: errors[0].message || "An error occurred!",
      showConfirmButton: true,
    });
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
  setLoading(false);
};
