import logoutDispatch from "../../utils/logoutDispatch";
import { GET_ERRORS, BASE_URL, GET_STATISTIC_GROUNDS } from "./types";
import { hera } from "hera-js";
import { arrayToObject } from "../../utils/commonFunction";

export const getGroundsByDate = (setLoading, date) => async (
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
                  grounds(date: $date) {
                      id
                      title 
                      totalAmount
                  }
                }
            `,
    variables: {
      date,
    },
  });
  if (!errors) {
    const grounds = arrayToObject(data.grounds);

    dispatch({
      type: GET_STATISTIC_GROUNDS,
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
