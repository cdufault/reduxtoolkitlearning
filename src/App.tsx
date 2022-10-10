import React from "react";

import WebMapView from "./features/webMap/WebMapView";
import WebSceneView from "./features/webScene/WebSceneView";

import "./App.css";

export default function App() {
  return (
    <>
      {/*<WebSceneView />*/}
      <WebMapView />
    </>
  );
}
