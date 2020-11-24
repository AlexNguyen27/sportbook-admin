import { UNAUTHENTICATE, GET_LOYAL_CUSTOMERS } from "../actions/types";

const initialState = {
  loyalCustomers: {},
};

export default function (state = initialState, action) {
  const { type, loyalCustomers } = action;
  switch (type) {
    case GET_LOYAL_CUSTOMERS:
      return {
        loyalCustomers,
      };
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
