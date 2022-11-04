import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewType: "2D",
};

export const viewSwitcherSlice = createSlice({
  name: "viewSwitcher",
  initialState,
  reducers: {
    changeViewType: (state, action) => {
      state.viewType = action.payload;
    },
  },
});

export const { changeViewType } = viewSwitcherSlice.actions;

export default viewSwitcherSlice.reducer;
