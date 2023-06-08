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
    // sortByPriceAscending() {},
    // sortByPriceDescending() {},
  },
});

export const {
  setStartupProducts,
  setFilter,
  //   sortByPriceAscending,
  //   sortByPriceDescending,
} = FilterSlice.actions;

export default FilterSlice.reducer;
