import {
    UNAUTHENTICATE,
    GET_PRICES,
    ADD_PRICE,
    EDIT_PRICE,
    DELETE_PRICE,
  } from "../actions/types";
  
  const initialState = {
    prices: {},
  };
  
  export default function (state = initialState, action) {
    const { type, prices, selectedId } = action;
    switch (type) {
      case GET_PRICES:
        return {
            prices: { ...prices },
        };
      case EDIT_PRICE:
      case ADD_PRICE:
        const price = action.price;
        return {
          ...state,
          prices: {
            ...state.prices,
            [price.id]: price,
          },
        };
      case DELETE_PRICE:
        const newPrices = state.prices;
        delete newPrices[selectedId];
        return {
          ...state,
          prices: newPrices,
        };
      case UNAUTHENTICATE:
        return initialState;
      default:
        return state;
    }
  }
  