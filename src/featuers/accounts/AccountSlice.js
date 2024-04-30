import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  purposeLoan: "",
  isLoading: false,
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan(state, action) {
      if (state.balance < state.loan) return state;
      state.balance += action.payload.amount;
      state.loan += action.payload.amount;
      state.purposeLoan = action.payload.purpose;
    },
    requestPayLoan(state, action) {
      state.balance -= state.loan;
      state.loan = 0;
    },

    loading(state, action) {
      state.isLoading = action.payload;
    },
  },
});
export const { deposit, withdraw, requestLoan, requestPayLoan, loading } =
  accountSlice.actions;

export default accountSlice.reducer;
// export default function accountReducer(state = initialAccuontState, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return { ...state, balance: state.balance + action.payload };

//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };

//     case "account/request/loan":
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         balance: state.balance + action.payload.amount,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//       };

//     case "account/request/payloan":
//       if (state.balance < state.loan) return state;
//       return {
//         ...state,
//         loan: 0,
//         balance: state.balance - state.loan,
//       };
//     case "account/loading":
//       return { ...state, isLoading: action.payload };
//     default:
//       return state;
//   }
// }
// export function deposit(amount, currency) {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };
//   return async function (dispatch, getState) {
//     dispatch({ type: "account/loading", payload: true });
//     try {
//       const res = await fetch(
//         `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//       );
//       const data = await res.json();
//       const convertTo = data.rates.USD;
//       dispatch({ type: "account/deposit", payload: convertTo });
//     } catch (err) {
//       throw Error(err);
//     } finally {
//       dispatch({ type: "account/loading", payload: false });
//     }
//   };
//   // return { type: "account/deposit", payload: amount };
// }
// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }
// export function requestLoan(amount, purpose) {
//   return { type: "account/request/loan", payload: { amount, purpose } };
// }
// export function requestPayLoan() {
//   return { type: "account/request/payloan" };
// }
