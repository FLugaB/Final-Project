import {
  FETCH_CONSULTATION_REQUESTS,
  FETCH_DOCTOR_CONSULTATION_REQUESTS,
  SET_LOADING,
  SET_ERROR,
} from "../actionType/consultationRequests.js";

const axios = require("axios");
//Server EndPoint
const server = `https://forsythia-server.herokuapp.com`;

export const fetchConsultationTickets = () => {

  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const access_token = localStorage.getItem("access_token");
      const result = await axios.get(`${server}/account/voucherUsed`, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          access_token: access_token,
        },
      });
      
      dispatch({ type:   FETCH_CONSULTATION_REQUESTS, payload: result.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
};