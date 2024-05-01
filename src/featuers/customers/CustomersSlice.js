import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalId: "",
  createAt: "",
};

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    createCustomer(state, action) {
      console.log(action);
      state.fullName = action.payload.fullName;
      state.nationalId = action.payload.nationalId;
      state.createAt = new Date().toISOString();
    },
  },
});

export const { createCustomer } = customersSlice.actions;
export default customersSlice.reducer;
// export default function customerReducer(state = initialCustomerState, action) {
//   switch (action.type) {
//     case "customer/create":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalId: action.payload.nationalId,
//         createAt: action.payload.createAt,
//       };
//     default:
//       return state;
//   }
// }

// export function createCustomer(fullName, nationalId) {
//   return {
//     type: "customer/create",
//     payload: { fullName, nationalId, createAt: new Date().toISOString() },
//   };
// }
