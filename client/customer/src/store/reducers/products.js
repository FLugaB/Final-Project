import { FETCH_PRODUCTS } from "../actionType/products";

const initialState = {
  products: [],
  product: {},
};
export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        state,
        products: action.payload,
      };

    default:
      return state;
  }
}
