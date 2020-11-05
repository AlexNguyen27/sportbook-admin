import {
  UNAUTHENTICATE,
  GET_REPORTS,
  EDIT_REPORT,
  ADD_REPORT,
  DELETE_REPORT,
} from "../actions/types";

const initialState = {
  reports: [],
};

export default function (state = initialState, action) {
  const { type, reports, reportedBy, postId, report } = action;
  switch (type) {
    case GET_REPORTS:
      return {
        ...state,
        reports,
      };
    case ADD_REPORT:
      return {
        ...state,
        categories: {
          ...state.reports,
          report,
        },
      };
    case EDIT_REPORT:
      const reportedIndex = state.reports.findIndex(
        (item) =>
          item.reportedBy === report.reportedBy && item.postId === report.postId
      );
      const newArr = [...state.reports];
      newArr[reportedIndex] = { ...newArr[reportedIndex], ...report };
      return {
        ...state,
        reports: [...newArr],
      };
    case DELETE_REPORT:
      const filterArr = state.reports.filter(
        (item) => item.reportedBy !== reportedBy && item.postId !== postId
      );
      return {
        ...state,
        reports: [...filterArr],
      };
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
