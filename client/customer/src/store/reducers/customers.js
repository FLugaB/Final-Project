import {
  FETCH_CUSTOMERS,
  FETCH_CUSTOMER_DETAIL,
  FETCH_CUSTOMER_CART,
  FETCH_CUSTOMER_CHECKOUT,
  FETCH_CUSTOMER_ORDER,
  CUSTOMER_IS_SUCCESS_LOGIN,
  SET_LOADING,
  SET_ERROR,
  CUSTOMER_LOGIN,
  CUSTOMER_IS_SUCCESS_REGISTER,
  CUSTOMER_IS_SUCCESS_LOGOUT,
  CUSTOMER_CHOOSE_DOCTOR
} from "../actionType/customers";

import { IS_ERROR, } from '../actionType/index'

const initialState = {
  customers: [],
  customerDetail: [],
  customerCart: [],
  customerCheckout: {},
  customerOrder: [],
  customerChooseDoctor: false,
  loadingCustomers: false,
  errorCustomers: null,
  isSuccessLogin: false,
  isSuccessRegister: false
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
    case FETCH_CUSTOMER_CART:
      return {
        ...state,
        customerCart: action.payload,
      };
    case FETCH_CUSTOMER_CHECKOUT:
      return { ...state, customerCheckout: action.payload };
    case FETCH_CUSTOMER_ORDER:
      return { ...state, customerOrder: action.payload };
    case CUSTOMER_IS_SUCCESS_LOGIN:
      return { ...state, isSuccessLogin: action.payload }
    case CUSTOMER_IS_SUCCESS_LOGOUT:
      localStorage.removeItem('access_token')
      return initialState
    case CUSTOMER_IS_SUCCESS_REGISTER:
      return { ...state, isSuccessRegister: action.payload }
    case IS_ERROR:
      return { ...state, errorCustomers: action.payload }
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
    case CUSTOMER_LOGIN:
      return state
    case CUSTOMER_CHOOSE_DOCTOR:
      return {
        ...state,
        customerChooseDoctor: action.payload
      }
    default:
      return state;
  }
}
