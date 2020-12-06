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
  waiting_for_approve: "Waiting for approve",
  cancelled: "Cancelled",
  approved: "Approved",
  paid: "Paid",
  // finished: "Finished" AUTO FINISHED WHEN OUT OF TIME
};

export const ORDER_STATUS_OPTION = {
  waiting_for_approve: {
    waiting_for_approve: "Waiting for approve",
    cancelled: "Cancelled",
    approved: "Approved",
  },
  cancelled: {
    cancelled: "Cancelled",
  },
  approved: {
    approved: "Approved",
    paid: "Paid",
  },
  paid: {
    paid: "Paid",
  },
};

export const COLOR_ORDER_STATUS = {
  waiting_for_approve: "primary",
  cancelled: "danger",
  approved: "warning",
  paid: "success",
  finished: "secondary",
};

export const EXTRA_INFO_LABEL = {
  favoriteFoot: "Favorite foot",
  playRole: "Play role",
  shirtNumber: "Shirt number",
  teamName: "Team name",
  favoritePlayTime: "Favorite play time",
};

export const SOCIAL_NETWORK_LABEL = {
  facebook: "Facebook",
  zalo: "Zalo",
  twitter: "Twitter",
};
