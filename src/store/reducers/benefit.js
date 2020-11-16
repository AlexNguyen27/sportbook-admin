import {
    UNAUTHENTICATE,
    GET_BENEFITS,
    DELETE_BENEFIT,
    EDIT_BENEFIT,
    ADD_BENEFIT
  } from "../actions/types";
  
  const initialState = {
    benefits: {},
  };
  
  export default function (state = initialState, action) {
    const { type, benefits, selectedId } = action;
    switch (type) {
      case GET_BENEFITS:
        return {
          benefits: { ...benefits },
        };
      case EDIT_BENEFIT:
      case ADD_BENEFIT:
        const benefit = action.benefit;
        return {
          ...state,
          benefits: {
            ...state.benefits,
            [benefit.id]: benefit,
          },
        };
      case DELETE_BENEFIT:
        const newBenefits = state.benefits;
        delete newBenefits[selectedId];
        return {
          ...state,
          benefits: newBenefits,
        };
      case UNAUTHENTICATE:
        return initialState;
      default:
        return state;
    }
  }
  