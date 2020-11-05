import logoutDispatch from "../../utils/logoutDispatch";
import {
  GET_ERRORS,
  CLEAR_ERRORS,
  BASE_URL,
  GET_REPORTS,
  ADD_REPORT,
  EDIT_REPORT,
  DELETE_REPORT,
} from "./types";
import { hera } from "hera-js";
// import { arrayToObject } from "../../utils/commonFunction";
import Swal from "sweetalert2";

export const getReports = (setLoading) => async (dispatch, getState) => {
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
                getReports {
                    reportedBy,
                    postId,
                    reason
                    description
                    status,
                    createdAt
                    updatedAt
                    imageUrl
                    post {
                      id
                      userId
                      title
                    }
                  }
            }
        `,
    variables: {},
  });
  if (!errors) {
    // const reports = arrayToObject(data.getReports);

    dispatch({
      type: GET_REPORTS,
      reports: data.getReports,
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

export const addReport = (
  setLoading,
  reportedBy,
  postId,
  reason,
) => async (dispatch, getState) => {
  const { token } = getState().auth;

  // todo: add image url
  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
    query: `
        mutation {
            createReport(
                reportedBy: $reportedBy, 
                postId: $postId, 
                reason: $reason, 
                status: "waiting_for_approve"
            ) {
                reportedBy,
                postId,
                reason
                status
            }
        }
    `,
    variables: {
      reportedBy,
      postId,
      reason,
    },
  });

  if (!errors) {
    dispatch({
      type: CLEAR_ERRORS,
    });

    dispatch({
      type: ADD_REPORT,
      report: data.createReport,
    });
    setLoading(false);
    Swal.fire({
      position: "center",
      type: "success",
      title: "Reported successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    const {
      extensions: { payload = {} },
    } = errors[0];
    setLoading(false)
    if (payload && payload.reportedBy && payload.postId) {
      Swal.fire({
        position: "center",
        type: "Warning",
        title: "You already reports this post",
        showConfirmButton: true,
      });
    } else {
      Swal.fire({
        position: "center",
        type: "Warning",
        title: errors[0].message,
        showConfirmButton: true,
      });
    }
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};

export const deleteReport = (setLoading, reportedBy, postId) => async (
  dispatch,
  getState
) => {
  console.log("-deleteReport----------");
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
      mutation {
        deleteReport(
            reportedBy: $reportedBy, 
            postId: $postId, 
         ) {
           status
           message
         }
      }
    `,
    variables: {
      reportedBy,
      postId,
    },
  });
  if (!errors) {
    dispatch({
      type: CLEAR_ERRORS,
    });

    dispatch({
      type: DELETE_REPORT,
      reportedBy,
      postId,
    });
    Swal.fire({
      position: "center",
      type: "success",
      title: "Deleted successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
    setLoading(false);
  } else {
    console.log(errors);
    logoutDispatch(dispatch, errors);
    Swal.fire({
      position: "center",
      type: "Warning",
      title: errors[0].message,
      showConfirmButton: true,
    });
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};

export const updateReport = (
  setLoading,
  reportedBy,
  postId,
  description,
  status
) => async (dispatch, getState) => {
  console.log("-updateReport----------");
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
      mutation {
        updateRerport(
            reportedBy: $reportedBy, 
            postId: $postId, 
            description: $description, 
            status: $status
          ) {
            reportedBy
            postId
            description
            status
            updatedAt
          }
      } 
    `,
    variables: {
      reportedBy,
      postId,
      description,
      status,
    },
  });
  if (!errors) {
    dispatch({
      type: CLEAR_ERRORS,
    });

    dispatch({
      type: EDIT_REPORT,
      report: data.updateRerport,
    });
    setLoading(false);
    Swal.fire({
      position: "center",
      type: "success",
      title: "Your work has been save!",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    console.log(errors);
    Swal.fire({
      position: "center",
      type: "Warning",
      title: errors[0].message,
      showConfirmButton: true,
    });
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};
