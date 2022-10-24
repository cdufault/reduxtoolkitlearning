import { configureStore } from "@reduxjs/toolkit";
import webMapViewReducer from "../features/webMap/webMapViewSlice";
import viewSwitcherReducer from "../features/ViewSwitcher/viewSwitcherSlice";
import webSceneViewReducer from "../features/webScene/webSceneViewSlice";

export const store = configureStore({
  reducer: {
    webMapView: webMapViewReducer,
    webSceneView: webSceneViewReducer,
    viewSwitcher: viewSwitcherReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
