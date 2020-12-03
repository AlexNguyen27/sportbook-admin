import { GET_ERRORS, BASE_URL, GET_LOYAL_CUSTOMERS } from "./types";
import { arrayToObject } from "../../utils/commonFunction";
import { hera } from "hera-js";
import logoutDispatch from "../../utils/logoutDispatch";

export const getLoyalCustomers = ({ weekday }, setLoading) => async (
  dispatch,
  getState
) => {
  const { token } = getState().auth;

  // play time get later
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
                loyalCustomers(weekday: $weekday){
                  id
                  email
                  firstName
                  lastName
                  phone
                  orders {
                    createdAt
                    status
                    startDay
                  }
                }
            }
          `,
    variables: {
      weekday,
    },
  });

  if (!errors) {
    const loyalCustomersObj = arrayToObject(data.loyalCustomers);

    dispatch({
      type: GET_LOYAL_CUSTOMERS,
      loyalCustomers: loyalCustomersObj,
    });

    setLoading(false);
  } else {
    console.log(errors);
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};
