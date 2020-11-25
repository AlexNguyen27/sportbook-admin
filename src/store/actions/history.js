import logoutDispatch from "../../utils/logoutDispatch";
import {
  GET_ERRORS,
  BASE_URL,
  GET_HISTORIES,
} from "./types";
import { hera } from "hera-js";
import { arrayToObject } from "../../utils/commonFunction";

export const getHistories = (setLoading, orderId) => async (
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
                  histories(orderId: $orderId) {
                    id
                    orderId
                    orderStatus
                    createdAt
                    order {
                      user {
                        id
                        firstName
                        lastName
                        phone
                        email
                      }
                    }
                  }
                }
            `,
    variables: {
      orderId,
    },
  });
  if (!errors) {
    const histories = arrayToObject(data.histories);

    dispatch({
      type: GET_HISTORIES,
      histories,
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
