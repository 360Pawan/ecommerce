import { Product } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartProduct extends Product {
  quantity?: number;
}

export interface CartState {
  cartItems: CartProduct[];
}

interface Quantity {
  quantity: number;
  id: string;
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

    removeFromCart(state, action: PayloadAction<string>) {
      const productId = action.payload;

      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.product.id !== productId
      );
    },

    updateQuantity(state, action: PayloadAction<Quantity>) {
      const { id, quantity } = action.payload;
      const product = state.cartItems.find((item) => item.product.id === id);

      if (product) product.quantity = quantity;
    },

    emptyCart(state) {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, emptyCart } =
  CartSlice.actions;
export default CartSlice.reducer;
