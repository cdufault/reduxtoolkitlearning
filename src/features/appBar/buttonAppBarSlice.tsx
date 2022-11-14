import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import esriRequest from "@arcgis/core/request";

const initialState = {
  loading: false,
};

export const getGeoJson = createAsyncThunk("getGeoJson", async () => {
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
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getGeoJson.pending, (state, action) => {
      console.log("pending async Thunk");
      console.log(action.payload);
      state.loading = true;
    });
    builder.addCase(getGeoJson.fulfilled, (state, action) => {
      console.log("fulfilled async Thunk");
      console.log(action.payload);
      state.loading = false;
    });
    builder.addCase(getGeoJson.rejected, (state, action) => {
      console.log("rejected async Thunk");
      console.log(action.payload);
      state.loading = false;
    });
  },
});

export const {} = buttonAppBarSlice.actions;

export default buttonAppBarSlice.reducer;
