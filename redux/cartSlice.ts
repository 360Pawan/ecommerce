import { Product } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartProduct extends Product {
  quantity?: number;
}

export interface CartState {
  cartItems: CartProduct[];
}

const initialState: CartState = {
  cartItems: [],
};

const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const product = action.payload;

      const existingProduct = state.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 0) + 1;
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const productId = action.payload;

      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== productId
      );
    },
  },
});

export const { addToCart, removeFromCart } = CartSlice.actions;
export default CartSlice.reducer;
