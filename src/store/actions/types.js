// export const BASE_URL = 'http://6bfe10facf33.ngrok.io/upload';
export const BASE_URL =
  process.env.REACT_APP_API_HOST || "http://localhost:9000/graphql";

export const BASE_IMAGE_URL =
  "https://avatars3.githubusercontent.com/u/11791361?v=4";

export const AUTHENTICATE = "AUTHENTICATE";
export const UNAUTHENTICATE = "UNAUTHENTICATE";

export const GET_ERRORS = "GET_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

// USER
export const EDIT_USER_INFO = "EDIT_USER_INFO";
export const GET_USERS = "GET_USERS";
export const DELETE_USER = "DELETE_USER";
export const EDIT_USER = "EDIT_USER";
export const SAVE_CURRENT_USER = "SAVE_CURRENT_USER";
export const UPLOAD_AVATAR = "UPLOAD_AVATAR";
export const UPLOAD_MOMO_QR_CODE = "UPLOAD_MOMO_QR_CODE";

export const GET_USER_PROFILE = "GET_USER_PROFILE";

// CATEGORY
export const GET_CATEGORIES = "GET_CATEGORIES";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const EDIT_CATEGORY = "EDIT_CATEGORY";
export const ADD_CATEGORY = "ADD_CATEGORY";

export const GET_REACTION_TYPE = "GET_REACTION_TYPE";

export const REACTION_SELECTED_POST = "REACTION_SELECTED_POST";

// COMMENT
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const GET_GITHUB_AVATAR = "GET_GITHUB_AVATAR";
export const GET_CURRENT_USER_AVATAR = "GET_CURRENT_USER_AVATAR";

// BENEFIT
export const GET_BENEFITS = "GET_BENEFITS";
export const DELETE_BENEFIT = "DELETE_BENEFIT";
export const EDIT_BENEFIT = "EDIT_BENEFIT";
export const ADD_BENEFIT = "ADD_BENEFIT";

// GROUND
export const GET_GROUNDS = "GET_GROUNDS";
export const DELETE_GROUND = "DELETE_GROUND";
export const EDIT_GROUND = "EDIT_GROUND";
export const ADD_GROUND = "ADD_GROUND";

// SUB GROUND
export const GET_SUB_GROUNDS = "GET_SUB_GROUNDS";
export const DELETE_SUB_GROUND = "DELETE_SUB_GROUND";
export const EDIT_SUB_GROUND = "EDIT_SUB_GROUND";
export const ADD_SUB_GROUND = "ADD_SUB_GROUND";

// PRICE
export const GET_PRICES = "GET_PRICES";
export const DELETE_PRICE = "DELETE_PRICE";
export const EDIT_PRICE = "EDIT_PRICE";
export const ADD_PRICE = "ADD_PRICE";

// ORDER
export const GET_ORDERS = "GET_ORDERS";
export const DELETE_ORDER = "DELETE_ORDER";
export const EDIT_ORDER = "EDIT_ORDER";
export const EDIT_ORDER_STATUS = "EDIT_ORDER_STATUS";
export const ADD_ORDER = "ADD_ORDER";

// LOYAL CUSTOMER
export const GET_LOYAL_CUSTOMERS = "GET_LOYAL_CUSTOMERS";

// STATISTICS
export const GET_STATISTIC_GROUNDS = "GET_STATISTICS_GROUNDS";
export const GET_REPORTS = "GET_REPORTS";

// HISTORY
export const GET_HISTORIES = "GET_HISTORIES";

// PREDICTION
export const GET_PREDICTION = "GET_PREDICTION";
export const GET_DESCRIBE = "GET_DESCRIBE";

// ADD ORDER MODAL
export const CLEAR_PRICE_SUB_GROUND = 'CLEAR_PRICE_SUB_GROUND'
