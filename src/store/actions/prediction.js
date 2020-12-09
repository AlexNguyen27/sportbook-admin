import axios from "../../utils/axios";
import logoutUser from "../../utils/logoutDispatch";
import { GET_ERRORS, GET_PREDICTION, GET_DESCRIBE } from "./types";
// import { prediction, describe } from "../../mockup/prediction";
import Swal from "sweetalert2";

export const getPredictionGround = (setLoading, params) => async (dispatch) => {
  try {
    const res = await axios.get("/predict", {
      params: {
        ...params,
      },
      headers: { "Content-Type": "application/json" },
    });

    if (res?.data?.status === "success") {
      console.log(res.data);

      dispatch({
        type: GET_PREDICTION,
        prediction: res.data,
      });
    } else {
      Swal.fire({
        icon: "error",
        position: "center",
        type: "Warning",
        title: "An error occurred!",
        showConfirmButton: true,
      });
    }

    setLoading(false);
  } catch (error) {
    logoutUser(dispatch, error);
    console.log("error-------------------", error);
    dispatch({
      type: GET_ERRORS,
      errors: error,
    });
  }
};

// GET majors data
export const getDescribe = (setLoading) => async (dispatch) => {
  try {
    const res = await axios.get("/describe", {
      headers: { "Content-Type": "application/json" },
    });

    if (res?.status === 200) {
      console.log(res.data);

      dispatch({
        type: GET_DESCRIBE,
        describe: res.data,
      });
    } else {
      Swal.fire({
        icon: "error",
        position: "center",
        type: "Warning",
        title: "An error occurred!",
        showConfirmButton: true,
      });
    }

    setLoading(false);
  } catch (error) {
    logoutUser(dispatch, error);
    console.log("error-------------------", error);
    dispatch({
      type: GET_ERRORS,
      errors: error,
    });
  }
};
