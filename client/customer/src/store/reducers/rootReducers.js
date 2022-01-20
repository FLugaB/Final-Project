import { combineReducers } from "redux";
import customersReducer from "./customers.js";
import doctorsReducer from "./doctors";

const rootReducer = combineReducers({
  customers: customersReducer,
  doctors: doctorsReducer,
});

export default rootReducer;
