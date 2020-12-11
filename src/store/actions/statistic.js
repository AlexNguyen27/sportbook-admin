import logoutDispatch from "../../utils/logoutDispatch";
import {
  GET_ERRORS,
  BASE_URL,
  GET_STATISTIC_GROUNDS,
  GET_REPORTS,
} from "./types";
import { hera } from "hera-js";
import { arrayToObject } from "../../utils/commonFunction";
import moment from "moment";

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
                      orderCount
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

export const getReports = (setLoading, startDate, endDate) => async (
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
              grounds(startDate: $startDate, endDate: $endDate) {
                  id
                  title 
                  phone
                  address {
                    address
                    regionCode
                    districtCode
                    wardCode
                  }
                  benefit
                  totalAmount
                  orderCount
              }
            }
        `,
    variables: {
      startDate: moment(startDate).startOf("day").format(),
      endDate: moment(endDate).startOf("day").format(),
    },
  });
  if (!errors) {
    const grounds = arrayToObject(data.grounds);

    dispatch({
      type: GET_REPORTS,
      reports: grounds,
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


