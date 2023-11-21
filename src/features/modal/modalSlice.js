import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const modalReducer = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state) {
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalReducer.actions;
export default modalReducer.reducer;
