const initialCustomerState = {
  fullName: "",
  nationalId: "",
  createAt: "",
};

export default function customerReducer(state = initialCustomerState, action) {
  switch (action.type) {
    case "customer/create":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createAt: action.payload.createAt,
      };
    default:
      return state;
  }
}

export function createCustomer(fullName, nationalId) {
  return {
    type: "customer/create",
    payload: { fullName, nationalId, createAt: new Date().toISOString() },
  };
}
