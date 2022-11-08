import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import View from "@arcgis/core/views/View";
import esriRequest from "@arcgis/core/request";

const initialState = {
  theView: new View(),
};

export const getGeoJson = createAsyncThunk("fetchLayer", async () => {
  let url =
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";
  return esriRequest(url, {
    responseType: "json",
  });
});

export const buttonAppBarSlice = createSlice({
  name: "buttonAppBar",
  initialState,
  reducers: {
    currentView: (state, action) => {
      state.theView = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getGeoJson.fulfilled, (state, action) => {
      console.log("Testing async Thunk");
      console.log(action);
    });
  },
});

export const { currentView } = buttonAppBarSlice.actions;

export default buttonAppBarSlice.reducer;
