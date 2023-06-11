import { Product } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
  filter: string;
  startupProducts: Product[];
}

const initialState: FilterState = {
  filter: "",
  startupProducts: [],
};

const FilterSlice = createSlice({
  name: "Filters",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },

    setStartupProducts(state, action: PayloadAction<Product[]>) {
      state.startupProducts = action.payload;
    },

    filterProducts(state, action: PayloadAction<string>) {
      if (action.payload === "ascending") {
        state.startupProducts = state.startupProducts.sort(
          (a, b) => a.price - b.price
        );
      } else if (action.payload === "descending") {
        state.startupProducts = state.startupProducts.sort(
          (a, b) => b.price - a.price
        );
      }
    },
  },
});

export const { setStartupProducts, setFilter, filterProducts } =
  FilterSlice.actions;

export default FilterSlice.reducer;
