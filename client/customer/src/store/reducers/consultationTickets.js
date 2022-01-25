import {
  FETCH_CONSULTATION_TICKETS,
  SET_LOADING,
  SET_ERROR,
} from "../actionType/consultationTickets";

const initialState = {
  consultationTickets: [],
  loadingConsultationTickets: false,
  errorConsultationTickets: null,
  isSuccessConsultationTickets: false,
};

export default function cosultationTicketsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CONSULTATION_TICKETS:
      return {
        ...state,
        consultationTickets: action.payload,
      };
    case SET_LOADING: 
      return {
        ...state,
        loadingConsultationTickets: action.payload,
      }
    case SET_ERROR:
      return {
        ...state,
        errorConsultationTickets: action.payload,
      }
    default:
      return state;
  }
}
