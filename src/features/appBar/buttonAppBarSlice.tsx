import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import View from "@arcgis/core/views/View";
import esriRequest from "@arcgis/core/request";

const initialState = {
  theView: new View(),
  loading: false,
};

export const getGeoJson = createAsyncThunk("fetchLayer", async () => {
  let url =
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";
  return esriRequest(url, {
    responseType: "json",
  }).then((response) => {
    return response.data;
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
    builder.addCase(getGeoJson.pending, (state, action) => {
      console.log("pending async Thunk");
      state.loading = true;
    });
    builder.addCase(getGeoJson.fulfilled, (state, action) => {
      console.log("fulfilled async Thunk");
      state.loading = false;
    });
    builder.addCase(getGeoJson.rejected, (state, action) => {
      console.log("rejected async Thunk");
      state.loading = false;
    });
  },
});

export const { currentView } = buttonAppBarSlice.actions;

export default buttonAppBarSlice.reducer;
