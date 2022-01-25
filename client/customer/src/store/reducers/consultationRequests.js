import {
  FETCH_CONSULTATION_REQUESTS,
  FETCH_DOCTOR_CONSULTATION_REQUESTS,
  SET_LOADING,
  SET_ERROR,
} from "../actionType/consultationRequests.js";

const initialState = {
  consultationRequests: [],
  doctorConsultationRequests: [],
  loadingConsultationRequests: false,
  errorConsultationRequests: null,
  isSuccessConsultationRequests: false,
};

export default function consultationRequestsReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case FETCH_CONSULTATION_REQUESTS:
      return {
        ...state,
        consultationRequests: action.payload,
      };
    case FETCH_DOCTOR_CONSULTATION_REQUESTS:
      return {
        ...state,
        doctorConsultationRequests: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loadingConsultationRequests: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        errorConsultationRequests: action.payload,
      };
    default:
      return state;
  }
}
