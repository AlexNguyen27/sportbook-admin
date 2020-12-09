import { UNAUTHENTICATE, GET_PREDICTION, GET_DESCRIBE } from "../actions/types";

const initialState = {
  prediction: {},
  describe: {},
};

export default function (state = initialState, action) {
  const { type, prediction, describe } = action;
  switch (type) {
    case GET_PREDICTION:
      return {
        ...state,
        prediction,
      };
    case GET_DESCRIBE:
      return {
        ...state,
        describe,
      };
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
