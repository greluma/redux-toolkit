import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const initialState = {
  cartItems: cartItems,
  amount: cartItems.length,
  total: 0,
  isLoading: true,
};

const cartReducer = createSlice({
  name: "cart",
  initialState,
});

// console.log(cartReducer);

export default cartReducer.reducer;
