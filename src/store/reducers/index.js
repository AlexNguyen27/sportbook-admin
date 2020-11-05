import { combineReducers } from "redux";
import errors from "./errors";
import auth from "./auth";
import user_profile from "./user_profile";
import user from "./user";
import post from "./post";
import category from "./category";
import report from "./report";
import reactionType from "./reactionType";

export default combineReducers({
  errors,
  auth,
  post,
  category,
  user,
  report,
  user_profile,
  reactionType,
});
