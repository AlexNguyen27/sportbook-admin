import { CLEAR_ERRORS } from "../store/actions/types";

export const DATE_TIME = "DD-MM-YYYY HH:mm:ss";
export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const REPORT_STATUS_ARRAY = [
  { name: "banned", value: "Banned" },
  { name: "waiting_for_approve", value: "Waiting for approve" },
  { name: "approve", value: "Approve" },
];

export const REPORT_STATUS_OBJECT = {
  banned: "BANNED",
  waiting_for_approve: "WAITTING FOR APPROVE",
  approve: "APPROVE",
};

export const POST_STATUS_ARRAY = [
  { name: "public", value: "PUBLIC" },
  { name: "private", value: "PRIVATE" },
];

export const POST_STATUS_OBJECT = {
  public: "PUBLIC",
  private: "PRIVATE",
};

export const GENDER = {
  male: 'male',
  female: 'female',
};