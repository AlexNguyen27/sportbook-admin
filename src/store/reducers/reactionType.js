import { UNAUTHENTICATE, GET_REACTION_TYPE } from "../actions/types";

const initialState = {
  reactionTypes: {},
};

export default function (state = initialState, action) {
  const { type, reactionTypes } = action;
  switch (type) {
    case GET_REACTION_TYPE:
      return {
        reactionTypes: { ...reactionTypes },
      };
    case UNAUTHENTICATE:
      return initialState;
    default:
      return state;
  }
}
