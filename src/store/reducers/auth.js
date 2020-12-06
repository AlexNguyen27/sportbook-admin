import {
  AUTHENTICATE,
  UNAUTHENTICATE,
  EDIT_USER_INFO,
  GET_GITHUB_AVATAR,
  UPLOAD_AVATAR,
  UPLOAD_MOMO_QR_CODE,
  //   AUTHENTICATE_TEACHER,
} from "../actions/types";
import setAuthToken from "../../utils/setAuthToken";

const initialState = {
  isAuthenticated: false,
  isManager: false,
  isAdmin: false,
  token: null,
  user: {},
};

export default function (state = initialState, action) {
  const { type, user, token } = action;
  switch (type) {
    case AUTHENTICATE:
      //Set Token to Auth header
      setAuthToken(token);
      //Save Token to Local Storage
      localStorage.setItem("token", token);

      const { isAdmin, isManager, userInfo } = user;
      return {
        isAuthenticated: true,
        isManager,
        isAdmin,
        token,
        user: userInfo,
      };
    case EDIT_USER_INFO:
      const { newUser } = action;
      return {
        ...state,
        user: {
          ...state.user,
          ...newUser,
        },
      };
    case UPLOAD_MOMO_QR_CODE:
    case UPLOAD_AVATAR: 
    const { userId } = action.uploadData;
    const uploadImages = { ...action.uploadData };
      if(userId === state.user.id) {
        delete uploadImages.userId;
        return {
          ...state,
          user: {
            ...state.user,
            ...uploadImages,
          }
        }
      }
      return {...state}
    case UNAUTHENTICATE:
      // Remove Token in Auth header
      setAuthToken(false);

      // Remove token from local storage
      localStorage.removeItem("token");
      return initialState;
    default:
      return state;
  }
}
