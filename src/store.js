import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";

// * creamos el store y se exporta a index.jsx para envolver la app por completo
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
