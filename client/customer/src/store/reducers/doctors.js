import {
  FETCH_DOCTORS,
  FETCH_DOCTOR_DETAIL,
  SET_LOADING,
  SET_ERROR,
} from "../actionType/doctors";

const initialState = {
  doctors: [],
  doctorDetail: [],
  loadingDoctors: false,
  errorDoctors: null,
};

export default function doctorsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DOCTORS:
      return {
        ...state,
        doctors: action.payload,
      };
    case FETCH_DOCTOR_DETAIL:
      return {
        ...state,
        doctorDetail: action.payload,
      }
    case SET_LOADING: 
      return {
        ...state,
        loadingDoctors: action.payload,
      }
    case SET_ERROR:
      return {
        ...state,
        errorDoctors: action.payload,
      }
    default:
      return state;
  }
}
