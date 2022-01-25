import {
  FETCH_CONSULTATION_TICKETS, FETCH_DOCTOR_CONSULTATION_TICKETS,
  SET_LOADING,
  SET_ERROR,
} from "../actionType/consultationTickets.js";
import { isError, isSuccess, isLoading } from "./status";
const axios = require("axios");
//Server EndPoint
const server = `http://localhost:3000`;

export const fetchConsultationTickets = () => {

  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const access_token = localStorage.getItem("access_token");
      const result = await axios.get(`${server}/account/tickets`, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          access_token: access_token,
        },
      });
      console.log(`===========================================`)
      console.log(result, `INI ADA DI STORE`)
      dispatch({ type: FETCH_CONSULTATION_TICKETS, payload: result.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
};

export const fetchDoctorConsultationTickets = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const access_token = localStorage.getItem("access_token");
      const result = await axios("http://localhost:3000/account/voucherUsed", {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          access_token: access_token,
        },
      });
      if(result.ok) throw new Error ("throwed Error from Fetch ConsultationTickets")
      dispatch({ type: FETCH_DOCTOR_CONSULTATION_TICKETS, payload: result.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err });
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
};
