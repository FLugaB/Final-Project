import {
  FETCH_CUSTOMERS,
  FETCH_CUSTOMER_DETAIL,
  SET_LOADING,
  SET_ERROR,
} from "../actionType/customers";

const initialState = {
  customers: [],
  customerDetail: [],
  loadingCustomers: false,
  errorCustomers: null,
};

export default function customersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CUSTOMERS:
      return {
        ...state,
        customers: action.payload,
      };
    case FETCH_CUSTOMER_DETAIL:
      return {
        ...state,
        customerDetail: action.payload,
      }
    case SET_LOADING: 
      return {
        ...state,
        loadingCustomers: action.payload,
      }
    case SET_ERROR:
      return {
        ...state,
        errorCustomers: action.payload,
      }
    default:
      return state;
  }
}
