import { CartState } from "./cartSlice";

export const loadState = () => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const serializedState = localStorage.getItem("state");

      if (serializedState === null) {
        return undefined;
      }

      return JSON.parse(serializedState);
    }
  } catch (error) {
    console.log("Error loading state from localStorage:", error);
    return undefined;
  }
};

export const saveState = (state: { cart: CartState }) => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("state", serializedState);
    }
  } catch (error) {
    console.log("Error saving state to localStorage:", error);
  }
};
