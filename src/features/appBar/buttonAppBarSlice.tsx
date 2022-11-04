import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewType: "2D",
};

export const buttonAppBarSlice = createSlice({
  name: "viewSwitcher",
  initialState,
  reducers: {
    changeViewType: (state, action) => {
      state.viewType = action.payload;
    },
  },
});

export const { changeViewType } = buttonAppBarSlice.actions;

export default buttonAppBarSlice.reducer;
