import React from "react";

import WebMapView from "../webMap/WebMapView";
import WebSceneView from "../webScene/WebSceneView";
import { useAppSelector } from "../../app/hooks";

const ViewSwitcher = (): JSX.Element => {
  const viewType = useAppSelector((state) => {
    return state.viewSwitcher.viewType;
  });

  return <>{viewType === "3D" ? <WebSceneView /> : <WebMapView />}</>;
};
export default ViewSwitcher;
