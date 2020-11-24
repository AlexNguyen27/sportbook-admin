import { UNAUTHENTICATE, GET_STATISTIC_GROUNDS } from "../actions/types";

const initialState = {
  grounds: {},
};

export default function (state = initialState, action) {
  const { type, grounds } = action;
  switch (type) {
    case GET_STATISTIC_GROUNDS:
      return {
        grounds,
      };
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
