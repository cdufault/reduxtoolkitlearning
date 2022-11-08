import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewMap: null,
  viewType: "2D",
};

export const viewSwitcherSlice = createSlice({
  name: "viewSwitcher",
  initialState,
  reducers: {
    currentViewMap: (state, action) => {
      state.viewMap = action.payload;
    },
    changeViewType: (state, action) => {
      state.viewType = action.payload;
    },
  },
});

export const { currentViewMap, changeViewType } = viewSwitcherSlice.actions;

export default viewSwitcherSlice.reducer;
