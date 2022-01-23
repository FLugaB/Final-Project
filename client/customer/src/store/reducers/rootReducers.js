import { combineReducers } from "redux";
import customersReducer from "./customers.js";
import doctorsReducer from "./doctors";
import productsReducer from "./products.js";
import userRoleReducer from "./userRole.js";

const rootReducer = combineReducers({
  customers: customersReducer,
  doctors: doctorsReducer,
  userRole: userRoleReducer,
  products: productsReducer,
});

export default rootReducer;
