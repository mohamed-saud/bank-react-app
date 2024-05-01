import { applyMiddleware, combineReducers, createStore } from "redux";
import accountSlice from "./featuers/accounts/AccountSlice";
import customersSlice from "./featuers/customers/CustomersSlice";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const rootReducer = combineReducers({
  account: accountSlice,
  customer: customersSlice,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
