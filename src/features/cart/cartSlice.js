import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const initialState = {
  cartItems: cartItems,
  amount: cartItems.length,
  total: getTotals(cartItems),
  isLoading: true,
};

const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.amount = 0;
      state.cartItems = [];
    },

    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.total = getTotals(state.cartItems);
    },

    increase: (state, action) => {
      const { payload } = action;
      state.cartItems.forEach((item) => {
        if (item.id === payload) {
          item.amount++;
          state.amount++;
        }
      });
      state.total = getTotals(state.cartItems);
    },

    decrease: (state, action) => {
      const { payload } = action;
      state.cartItems = state.cartItems.filter((item) => {
        if (item.id === payload) {
          if (item.amount === 1) {
            return false;
          }
          item.amount--;
          state.amount--;
        }
        return true;
      });
      state.total = getTotals(state.cartItems);
    },
  },
});

function getTotals(cartItems) {
  const res = cartItems.reduce((total, item) => {
    return total + item.price * item.amount;
  }, 0);
  return parseFloat(res.toFixed(2));
}

export const { clearCart, removeItem, increase, decrease } =
  cartReducer.actions;

export default cartReducer.reducer;
