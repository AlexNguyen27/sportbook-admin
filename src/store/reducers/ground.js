import {
  UNAUTHENTICATE,
  GET_GROUNDS,
  EDIT_GROUND,
  ADD_GROUND,
  DELETE_GROUND,
} from "../actions/types";

const initialState = {
  grounds: {},
};

export default function (state = initialState, action) {
  const { type, grounds, selectedId } = action;
  switch (type) {
    case GET_GROUNDS:
      return {
        grounds: { ...grounds },
      };
    case EDIT_GROUND:
    case ADD_GROUND:
      const ground = action.ground;
      return {
        ...state,
        grounds: {
          ...state.grounds,
          [ground.id]: ground,
        },
      };
    case DELETE_GROUND:
      const newGrounds = state.grounds;
      delete newGrounds[selectedId];
      return {
        ...state,
        grounds: newGrounds,
      };
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
