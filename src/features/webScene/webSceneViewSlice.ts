import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  webScenePortalItemId: "d1eb2b990f964e739a9cf3e0cc022b3c",
};

export const webSceneViewSlice = createSlice({
  name: "webSceneView",
  initialState,
  reducers: {
    changeWebScenePortalItemId: (state, action) => {
      state.webScenePortalItemId = action.payload;
    },
  },
  // used to update cases from other slices on this slice
  extraReducers: (builder) => {},
});

export const { changeWebScenePortalItemId } = webSceneViewSlice.actions;

export default webSceneViewSlice.reducer;
