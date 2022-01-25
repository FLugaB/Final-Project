import {
  FETCH_CUSTOMER_CHECKOUT,
  FETCH_CUSTOMER_CART,
  FETCH_CUSTOMER_ORDER,
  CUSTOMER_LOGIN,
  CUSTOMER_REGISTER,
  CUSTOMER_IS_SUCCESS_REGISTER,
  CUSTOMER_IS_SUCCESS_LOGIN,
  CUSTOMER_IS_SUCCESS_LOGOUT,
  CUSTOMER_CHOOSE_DOCTOR,
} from "../actionType/customers";
import { isError, isSuccess, isLoading } from "./status";

import axios from "axios";

//Server EndPoint
const server = `http://localhost:3000`;

export const login = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch(isSuccess(false));
      dispatch(isLoading(true));
      dispatch(isError(null));
      const response = await fetch(`${server}/login`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const output = await response.json();
      if (!response.ok) throw output;
      localStorage.setItem("access_token", output.access_token);
      dispatch({ type: CUSTOMER_IS_SUCCESS_LOGIN, payload: true });
    } catch (error) {
      dispatch(isError(error));
    } finally {
      dispatch(isLoading(false));
    }
  };
};
export const register = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch(isSuccess(false));
      dispatch(isLoading(true));
      dispatch(isError(null));
      const response = await fetch(`${server}/register`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const output = await response.json();
      if (!response.ok) throw output;
      dispatch({ type: CUSTOMER_IS_SUCCESS_REGISTER, payload: true });
    } catch (error) {
      dispatch(isError(error));
    } finally {
      dispatch(isLoading(false));
    }
  };
};
export const logout = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: CUSTOMER_IS_SUCCESS_LOGOUT });
    } catch (error) {
      dispatch(isError(error));
    } finally {
      dispatch(isLoading(false));
    }
  };
};

export const addTicketToCart = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch(isSuccess(false));
      dispatch(isLoading(true));
      dispatch(isError(null));
      const access_token = localStorage.getItem(`access_token`);
      const response = await axios.post(
        `${server}/products/chat`,
        {},
        { headers: { access_token } }
      );
    } catch (error) {
      dispatch(isError(error));
    } finally {
      dispatch(isLoading(false));
    }
  };
};

export const fetchCart = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch(isSuccess(false));
      dispatch(isLoading(true));
      dispatch(isError(null));
      const access_token = localStorage.getItem(`access_token`);
      const response = await axios.get(`${server}/account/cart`, {
        headers: { access_token },
      });
      dispatch({ type: FETCH_CUSTOMER_CART, payload: response.data });
    } catch (error) {
      dispatch(isError(error));
    } finally {
      dispatch(isLoading(false));
    }
  };
};

export const fetchCheckout = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch(isSuccess(false));
      dispatch(isLoading(true));
      dispatch(isError(null));
      const access_token = localStorage.getItem(`access_token`);
      const response = await axios.get(`${server}/account/detail-checkout`, {
        headers: { access_token },
      });
      dispatch({ type: FETCH_CUSTOMER_CHECKOUT, payload: response.data });
    } catch (error) {
      dispatch(isError(error));
    } finally {
      dispatch(isLoading(false));
    }
  };
};

export const requestSnap = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch(isSuccess(false));
      dispatch(isLoading(true));
      dispatch(isError(null));
      const access_token = localStorage.getItem(`access_token`);
      const response = await axios.post(
        `${server}/account/payment`,
        {},
        { headers: { access_token } }
      );
      window.snap.pay(response.data.snap_token.token);
    } catch (error) {
      dispatch(isError(error));
    } finally {
      dispatch(isLoading(false));
    }
  };
};

export const chooseClientDoctor = (payload) => {
  console.log(payload, "chooseDoctor");
  return async (dispatch, getState) => {
    try {
      dispatch(isSuccess(false));
      dispatch(isLoading(true));
      dispatch(isError(null));
      const access_token = localStorage.getItem("access_token");
      console.log(access_token);
      const response = await axios.patch(
        `${server}/account/tickets/${payload}`,
        {},
        { headers: { access_token } }
      );
      console.log(response.statusText, "hayo");
      dispatch({ type: CUSTOMER_CHOOSE_DOCTOR, payload: true });
      window.snap.pay(response.data.snap_token.token);
    } catch (err) {
      dispatch(isError(err));
    } finally {
      dispatch(isLoading(false));
    }
  };
};

// fetch history order
export const fetchHistoryOrder = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(isSuccess(false));
      dispatch(isLoading(true));
      dispatch(isError(null));
      const access_token = localStorage.getItem("access_token")
      const response = await axios.get(
        `${server}/account/status-transactions`,
        {
          headers: {
            access_token
          }
        }
      );
      dispatch({ type: CUSTOMER_CHOOSE_DOCTOR, payload: response.data })
    } catch (err) {
      dispatch(isError(err));
    } finally {
      dispatch(isLoading(false));
    }
  };
};