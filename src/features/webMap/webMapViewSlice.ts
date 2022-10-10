import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  portalItemId: "aa1d3f80270146208328cf66d022e09c",
};

export const webMapViewSlice = createSlice({
  name: "webMapView",
  initialState,
  reducers: {
    changePortalItemId: (state, action) => {
      state.portalItemId = action.payload;
    },
  },
});

export const { changePortalItemId } = webMapViewSlice.actions;

export default webMapViewSlice.reducer;
