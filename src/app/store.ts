import { configureStore } from "@reduxjs/toolkit";
import webMapViewReducer from "../features/webMap/webMapViewSlice";
import viewSwitcherReducer from "../features/viewSwitcher/viewSwitcherSlice";
import webSceneViewReducer from "../features/webScene/webSceneViewSlice";
import buttonAppBarReducer from "../features/appBar/buttonAppBarSlice";

export const store = configureStore({
  reducer: {
    webMapView: webMapViewReducer,
    webSceneView: webSceneViewReducer,
    viewSwitcher: viewSwitcherReducer,
    buttonAppBar: buttonAppBarReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
