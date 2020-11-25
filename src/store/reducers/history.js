import {
    UNAUTHENTICATE,
    GET_HISTORIES,
  } from "../actions/types";
  
  const initialState = {
    histories: {},
  };
  
  export default function (state = initialState, action) {
    const { type, histories } = action;
    switch (type) {
      case GET_HISTORIES:
        return {
          histories,
        };
      case UNAUTHENTICATE:
        return initialState;
      default:
        return state;
    }
  }
  