import { combineReducers } from "redux";
import customersReducer from "./customers.js";
import doctorsReducer from "./doctors";
import userRoleReducer from "./userRole.js";

const rootReducer = combineReducers({
  customers: customersReducer,
  doctors: doctorsReducer,
  userRole: userRoleReducer
});

export default rootReducer;
