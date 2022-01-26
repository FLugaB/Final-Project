import { combineReducers } from "redux";
import customersReducer from "./customers.js";
import doctorsReducer from "./doctors.js";
import userRoleReducer from "./userRole.js";
import productsReducer from "./products.js"
import consultationTicketsReducer from "./consultationTickets.js"
import consultationRequestsReducer from "./consultationRequests.js"

const rootReducer = combineReducers({
  customers: customersReducer,
  doctors: doctorsReducer,
  userRole: userRoleReducer,
  products: productsReducer,
  consultationTickets: consultationTicketsReducer,
  consultationRequests: consultationRequestsReducer,
});

export default rootReducer;
