// export const BASE_URL = 'http://6bfe10facf33.ngrok.io/upload';
export const BASE_URL =
  process.env.REACT_APP_API_HOST || "http://localhost:9000/graphql";

export const BASE_IMAGE_URL =
  "https://avatars3.githubusercontent.com/u/11791361?v=4";

export const AUTHENTICATE = "AUTHENTICATE";
export const UNAUTHENTICATE = "UNAUTHENTICATE";

export const GET_ERRORS = "GET_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const GET_COURSES = "GET_COURSES";
export const GET_COURSE_DETAIL = "GET_COURSE_DETAIL";

export const GET_USER_COURSES = "GET_USER_COURSES";
export const DELETE_COURSE = "DELETE_COURSE";
export const ADD_COURSE = "ADD_COURSE";
export const EDIT_COURSE = "EDIT_COURSE";

export const REMOVE_COURSE_DETAIL = "REMOVE_COURSE_DETAIL";

export const ADD_LECTURE = "ADD_LECTURE";
export const EDIT_LECTURE = "EDIT_LECTURE";
export const DELETE_LECTURE = "DELETE_LECTURE";
export const GET_LECTURES = "GET_LECTURES";
export const GET_LECTURE_DETAIL = "GET_LECTURE_DETAIL";

export const GET_QUESTIONS = "GET_QUESTIONS";
export const GET_QUESTION_DETAIL = "GET_QUESTION_DETAIL";
export const EDIT_QUESTION = "EDIT_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";
export const DELETE_QUESTION = "DELETE_QUESTION";

// USING
export const EDIT_USER_INFO = "EDIT_USER_INFO";
export const GET_USERS = "GET_USERS";
export const DELETE_USER = "DELETE_USER";
export const EDIT_USER = "EDIT_USER";
export const SAVE_CURRENT_USER = "SAVE_CURRENT_USER";

export const GET_USER_PROFILE = "GET_USER_PROFILE";

export const GET_POSTS = "GET_POSTS";
export const DELETE_POST = "DELETE_POST";
export const EDIT_POST = "EDIT_POST";
export const ADD_POST = "ADD_POST";

export const GET_CATEGORIES = "GET_CATEGORIES";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const EDIT_CATEGORY = "EDIT_CATEGORY";
export const ADD_CATEGORY = "ADD_CATEGORY";

export const GET_FRIEND_PROFILE = "GET_FRIEND_PROFILE";

export const GET_REPORTS = "GET_REPORTS";
export const DELETE_REPORT = "DELETE_REPORT";
export const EDIT_REPORT = "EDIT_REPORT";
export const ADD_REPORT = "ADD_REPORT";

export const GET_SELECTED_POST = "GET_SELECTED_POST";

export const FOLLOW_UNFOLLOW = "FOLLOW_UNFOLLOW";
export const LIKE_REACTION = "LIKE_REACTION";

export const GET_REACTION_TYPE = "GET_REACTION_TYPE";

export const REACTION_SELECTED_POST = "REACTION_SELECTED_POST";

export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const GET_GITHUB_AVATAR = "GET_GITHUB_AVATAR";
export const GET_CURRENT_USER_AVATAR = "GET_CURRENT_USER_AVATAR";
