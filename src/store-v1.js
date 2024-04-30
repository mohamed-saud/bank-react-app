import { combineReducers, createStore } from "redux";

const initialAccuontState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};
const initialCustomerState = {
  fullName: "",
  nationalId: "",
  createAt: "",
};

function accountReducer(state = initialAccuontState, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/request/loan":
      if (state.loan > 0) return state;
      return { ...state, balance: state.balance + action.payload };

    case "account/request/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}
function customerReducer(state = initialCustomerState, action) {
  switch (action.type) {
    case "customer/create":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createAt: action.payload.createAt,
      };
    default:
      return {};
  }
}

function createCustomer(fullName, nationalId) {
  return {
    type: "customer/create",
    payload: { fullName, nationalId, createAt: new Date().toISOString() },
  };
}
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);
