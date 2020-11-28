import { GET_ERRORS, CLEAR_ERRORS, UNAUTHENTICATE } from "../actions/types";

const initialState = {};
export default (state = initialState, action) => {
  const { errors, type } = action;
  switch (type) {
    case GET_ERRORS:
      return { ...errors };
    case CLEAR_ERRORS:
      return {};
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
};
