import {
  UNAUTHENTICATE,
  GET_GROUNDS,
  EDIT_GROUND,
  ADD_GROUND,
  DELETE_GROUND,
  GET_GROUNDS_SCHEDULE,
} from "../actions/types";

const initialState = {
  grounds: {},
  scheduleDisplay: [],
};

export default function (state = initialState, action) {
  const { type, grounds, selectedId } = action;
  switch (type) {
    case GET_GROUNDS:
      return {
        ...state,
        grounds: { ...grounds },
      };
    case GET_GROUNDS_SCHEDULE:
      return {
        ...state,
        scheduleDisplay: [...action.scheduleDisplay],
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
