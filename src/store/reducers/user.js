import {
  GET_USERS,
  UNAUTHENTICATE,
  DELETE_USER,
  EDIT_USER,
  SAVE_CURRENT_USER,
  GET_CURRENT_USER_AVATAR,
  UPLOAD_AVATAR,
  UPLOAD_MOMO_QR_CODE,
} from "../actions/types";

const initialState = {
  users: {},
  current_user: {},
};

export default function (state = initialState, action) {
  const { type, users } = action;
  switch (type) {
    case GET_USERS:
      return {
        users,
      };
    case EDIT_USER:
      const { newUser, selectedId } = action;
      return {
        users: { ...state.users, [selectedId]: newUser },
        current_user: newUser,
      };
    case DELETE_USER:
      const newUsers = state.users;
      delete newUsers[action.selectedId];
      return {
        users: newUsers,
      };
    case SAVE_CURRENT_USER:
      const { currentUser } = action;
      return {
        ...state,
        current_user: currentUser,
      };
    case UPLOAD_MOMO_QR_CODE:
    case UPLOAD_AVATAR:
      const { userId } = action.uploadData;
      const uploadImages = { ...action.uploadData };
      if (userId === state.current_user?.id) {
        delete uploadImages.userId;
        return {
          ...state,
          current_user: {
            ...state.current_user,
            ...uploadImages,
          },
        };
      }
      return { ...state };
    case GET_CURRENT_USER_AVATAR:
      return {
        ...state,
        current_user: {
          ...state.current_user,
          imageUrl: action.imageUrl,
        },
      };
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
