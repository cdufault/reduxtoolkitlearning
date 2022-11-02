import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  webScenePortalItemId: "d1eb2b990f964e739a9cf3e0cc022b3c",
  webScene: null,
};

export const webSceneViewSlice = createSlice({
  name: "webSceneView",
  initialState,
  reducers: {
    changeWebScenePortalItemId: (state, action) => {
      state.webScenePortalItemId = action.payload;
    },
    updateWebScene: (state, action) => {
      state.webScene = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  changeWebScenePortalItemId,
  updateWebScene,
} = webSceneViewSlice.actions;

export default webSceneViewSlice.reducer;
