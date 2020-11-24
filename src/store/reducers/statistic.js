import {
  UNAUTHENTICATE,
  GET_STATISTIC_GROUNDS,
  GET_REPORTS,
} from "../actions/types";

const initialState = {
  grounds: {},
  reports: {},
};

export default function (state = initialState, action) {
  const { type, grounds, reports } = action;
  switch (type) {
    case GET_STATISTIC_GROUNDS:
      return {
        grounds,
        reports: { ...state.reports },
      };
    case GET_REPORTS:
      return {
        grounds: { ...state.grounds },
        reports,
      };
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
