import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExampleState {
  value: number;
}

const initialState: ExampleState = { value: 0 };

const ExampleSlice = createSlice({
  name: "Example",
  initialState,
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = ExampleSlice.actions;
export default ExampleSlice.reducer;
