import {
  FETCH_PRODUCTS,
  FETCH_PRODUCT_DETAIL,
  SET_LOADING,
  SET_ERROR,
} from "../actionType/products";

const initialState = {
  products: [],
  productDetail: [],
  loadingProducts: false,
  errorProducts: null,
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case FETCH_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: action.payload,
      }
    case SET_LOADING: 
      return {
        ...state,
        loadingProducts: action.payload,
      }
    case SET_ERROR:
      return {
        ...state,
        errorProducts: action.payload,
      }
    default:
      return state;
  }
}
