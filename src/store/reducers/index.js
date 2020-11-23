import { combineReducers } from "redux";
import errors from "./errors";
import auth from "./auth";
import user from "./user";
import category from "./category";
import benefit from "./benefit";
import ground from "./ground";
import subGround from "./subGround";
import price from "./price";

export default combineReducers({
  errors,
  auth,
  user,
  benefit,
  category,
  ground,
  subGround,
  price
});
