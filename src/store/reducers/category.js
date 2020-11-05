import {
  UNAUTHENTICATE,
  GET_CATEGORIES,
  EDIT_CATEGORY,
  ADD_CATEGORY,
  DELETE_CATEGORY,
} from "../actions/types";

const initialState = {
  categories: {},
};

export default function (state = initialState, action) {
  const { type, categories, selectedId } = action;
  switch (type) {
    case GET_CATEGORIES:
      return {
        categories: { ...categories },
      };
    case EDIT_CATEGORY:
    case ADD_CATEGORY:
      const category = action.category;
      return {
        ...state,
        categories: {
          ...state.categories,
          [category.id]: category,
        },
      };
    case DELETE_CATEGORY:
      const newCategories = state.categories;
      delete newCategories[selectedId];
      return {
        ...state,
        categories: newCategories,
      };
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
