import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CheckoutState {
  address: any;
  steps: { address: boolean; payment: boolean };
}

const initialState: CheckoutState = {
  address: {
    email: "",
    name: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  },
  steps: {
    address: false,
    payment: false,
  },
};

const CheckoutSlice = createSlice({
  name: "Checkout",
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<string>) {
      if (action.payload === "address")
        state.steps = { ...state.steps, address: true };
      else if (action.payload === "payment")
        state.steps = { ...state.steps, payment: true };
    },
  },
});

export const {} = CheckoutSlice.actions;
export default CheckoutSlice.reducer;
