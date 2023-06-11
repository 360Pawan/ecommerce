import { CartState } from "./cartSlice";
import { CheckoutState } from "./checkoutSlice";

export const loadState = () => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const serializedState = localStorage.getItem("state");
      const serializedCheckoutState = localStorage.getItem("checkoutState");

      if (serializedState === null || serializedCheckoutState === null) {
        return undefined;
      }

      const { cartItems } = JSON.parse(serializedState);
      const { address } = JSON.parse(serializedCheckoutState);
      const { steps } = JSON.parse(serializedCheckoutState);
      const state = {
        cart: { cartItems: cartItems },
        filters: { filter: "", startupProducts: [] },
        checkout: { steps: steps, address: address },
      };

      return state;
    }
  } catch (error) {
    console.log("Error loading state from localStorage:", error);
    return undefined;
  }
};

export const saveState = (state: {
  cart: CartState;
  checkout: CheckoutState;
}) => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const cartState = state.cart;
      const serializedState = JSON.stringify(cartState);
      localStorage.setItem("state", serializedState);

      const addressState = state.checkout;
      const serializedCheckoutState = JSON.stringify(addressState);
      localStorage.setItem("checkoutState", serializedCheckoutState);
    }
  } catch (error) {
    console.log("Error saving state to localStorage:", error);
  }
};
