import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { openModal } from "../modal/modalSlice";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (ejemplo, thunkAPI) => {
    // console.log(ejemplo);
    // * thunkAPI contiene el dispatch y el getState
    // console.log(thunkAPI.getState());
    // thunkAPI.dispatch(openModal());
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      // console.log(error.response);
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

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
            state.amount--;
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

  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
        state.amount = action.payload.length;
        state.total = getTotals(action.payload);
      })
      .addCase(getCartItems.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      });
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
