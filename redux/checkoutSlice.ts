import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CheckoutState {
  address: Address;
  steps: { address: boolean; payment: boolean };
}

export interface Address {
  email: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
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

    setAddress(state, action: PayloadAction<Address>) {
      state.address = action.payload;
    },
  },
});

export const { setStep, setAddress } = CheckoutSlice.actions;
export default CheckoutSlice.reducer;
