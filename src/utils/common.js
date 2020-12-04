import { CLEAR_ERRORS } from "../store/actions/types";

export const DATE_TIME = "DD-MM-YYYY HH:mm A";
export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const GENDER = {
  male: "Male",
  female: "Female",
};
export const ROLE = {
  admin: "admin",
  user: "user",
  owner: "owner",
};

export const FAVORITE_FOOT = {
  right: "Right",
  left: "Left",
  both: "Both",
};

export const SUB_GROUND_STATUS = {
  ready: "ready",
  reserved: "reserved",
};

export const PAYMENT_TYPE = {
  online: "Online",
  offline: "Offline",
};

export const ORDER_STATUS = {
  waiting_for_appove: "Waiting for approve",
  cancelled: "Cancelled",
  approved: "Approved",
  paid: "Paid",
};

export const COLOR_ORDER_STATUS = {
  waiting_for_appove: "primary",
  cancelled: "danger",
  approved: "warning",
  paid: "success",
};
