import { createSlice } from "@reduxjs/toolkit";
import View from "@arcgis/core/views/View";

const initialState = {
  currentView: new View(),
};

export const buttonAppBarSlice = createSlice({
  name: "buttonAppBar",
  initialState,
  reducers: {
    currentView: (state, action) => {
      state.currentView = action.payload;
    },
  },
});

export const { currentView } = buttonAppBarSlice.actions;

export default buttonAppBarSlice.reducer;
