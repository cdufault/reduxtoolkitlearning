import React from "react";
import WebSceneView from "../webScene/WebSceneView";
import WebMapView from "../webMap/WebMapView";
import { useAppSelector } from "../../app/hooks";

const ViewSwitcher = (): JSX.Element => {
  const viewType = useAppSelector((state) => {
    return state.viewSwitcher.viewType;
  });

  return <>{viewType === "3D" ? <WebSceneView /> : <WebMapView />}</>;
};
export default ViewSwitcher;
