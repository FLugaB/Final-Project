import {
  FETCH_CONSULTATION_TICKETS,
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
      const result = await axios("http://localhost:3000/account/tickets", {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJjaW5keUBtYWlsLmNvbSIsImlhdCI6MTY0MzAyOTc5NX0.IzU74Cj9gYFblu8xRmfoOvOcK-1n_ClkoLVVHsRA20k",
        },
      });
      if(result.ok) throw new Error ("throwed Error from Fetch ConsultationTickets")
      dispatch({ type: FETCH_CONSULTATION_TICKETS, payload: result.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err });
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
};
