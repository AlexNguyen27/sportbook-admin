import { CLEAR_ERRORS } from "../store/actions/types";

export const DATE_TIME = "DD-MM-YYYY HH:mm:ss";
export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};


export const GENDER = {
  male: 'Male',
  female: 'Female',
};
export const ROLE = {
  admin: 'admin',
  user: 'user',
  owner: 'owner',
};

export const FAVORITE_FOOT = {
  right: 'Right',
  left: 'Left',
  both: 'Both',
};

export const SUB_GROUND_STATUS = {
  ready: 'ready',
  reserved: 'reserved',
};

export const PAYMENT_TYPE = {
  online: 'Online',
  offline: 'Offline',
};

export const ORDER_STATUS = {
  new: 'New',
  cancelled: 'Cancelled',
  approved: 'Approved',
};
