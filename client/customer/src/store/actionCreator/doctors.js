import {
  FETCH_DOCTORS,
  FETCH_DOCTOR_DETAIL,
  SET_LOADING,
  SET_ERROR,
} from "../actionType/doctors.js";

const server = "https://forsythia-server.herokuapp.com"

export const fetchDoctors = () => {
  return (dispatch, getState) => {
    dispatch({ type: SET_LOADING, payload: true})
    setTimeout(() => {
      fetch(`${server}/doctors`)
      .then((res) => {
        if (!res.ok) throw new Error ("throwed Error from Fetch Doctors")
        return res.json();
      })
      .then((data) => {
        console.log(data, `data FETCH DOCTORS on actionCreator/index`);
        dispatch({ type: FETCH_DOCTORS, payload: data})
      })
      .catch((err) => {
        console.log(err, `error FETCH DOCTORS on actionCreator/index`);
        dispatch({ type: SET_ERROR, payload: err})
      })
      .finally(() => {
        dispatch({ type: SET_LOADING, payload: false})
      })
    }, 1200);
  }
}

export const fetchDoctorDetail = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_LOADING, payload: true})
    setTimeout(() => {
      fetch(`${server}/doctors/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error ("throwed Error from Fetch Doctors")
        return res.json();
      })
      .then((data) => {
        console.log(data, `data FETCH DOCTOR DETAIL on actionCreator/index`);
        dispatch({ type: FETCH_DOCTOR_DETAIL, payload: data})
      })
      .catch((err) => {
        console.log(err, `error FETCH DOCTOR DETAIL on actionCreator/index`);
        dispatch({ type: SET_ERROR, payload: err})
      })
      .finally(() => {
        dispatch({ type: SET_LOADING, payload: false})
      })
    }, 1200);
  }
}

