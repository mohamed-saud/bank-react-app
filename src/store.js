import { applyMiddleware, combineReducers, createStore } from "redux";
import accountSlice from "./featuers/accounts/AccountSlice";
import customerReducer from "./featuers/customers/CustomersSlice";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const rootReducer = combineReducers({
  account: accountSlice,
  customer: customerReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
