import { CartState } from "./cartSlice";

export const loadState = () => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const serializedState = localStorage.getItem("state");

      if (serializedState === null) {
        return undefined;
      }

      const { cartItems } = JSON.parse(serializedState);
      const state = {
        cart: { cartItems: cartItems },
        filters: { filter: "", startupProducts: [] },
      };

      return state;
    }
  } catch (error) {
    console.log("Error loading state from localStorage:", error);
    return undefined;
  }
};

export const saveState = (state: { cart: CartState }) => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const cartState = state.cart;
      const serializedState = JSON.stringify(cartState);
      localStorage.setItem("state", serializedState);
    }
  } catch (error) {
    console.log("Error saving state to localStorage:", error);
  }
};
