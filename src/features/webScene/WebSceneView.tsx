import React, { useRef, useEffect } from "react";
import WebScene from "@arcgis/core/WebScene.js";
import SceneView from "@arcgis/core/views/SceneView";
import {
  changeWebScenePortalItemId,
  updateWebScene,
} from "./webSceneViewSlice";
import { changeViewType } from "../viewSwitcher/viewSwitcherSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const WebSceneView = (): JSX.Element => {
  const mapDiv = useRef(null);

  const portalItemId = useAppSelector((state) => {
    return state.webSceneView.webScenePortalItemId;
  });
  const viewType = useAppSelector((state) => {
    return state.viewSwitcher.viewType;
  });

  const webScene = useAppSelector((state) => {
    return state.webSceneView.webScene;
  });

  const dispatch = useAppDispatch();

  const onSwitchClicked = () => {
    if (portalItemId === "d1eb2b990f964e739a9cf3e0cc022b3c") {
      dispatch(changeWebScenePortalItemId("3ec84e3c188c47fb89f69803ec729231"));
    } else {
      dispatch(changeWebScenePortalItemId("d1eb2b990f964e739a9cf3e0cc022b3c"));
    }
  };

  const onViewClicked = () => {
    if (viewType === "2D") {
      dispatch(changeViewType("3D"));
    } else {
      dispatch(changeViewType("2D"));
    }
  };

  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize webScene
       */

      if (webScene) {
        const view = new SceneView({
          container: mapDiv.current,
          map: webScene,
        });
      }
    }
  }, [webScene]);

  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */

      const newWebScene = new WebScene({
        portalItem: {
          id: portalItemId,
        },
      });
      dispatch(updateWebScene(newWebScene));
    }
  }, [portalItemId]);

  return (
    <>
      <div className="mapDiv" ref={mapDiv}></div>
      <div id="infoDiv">
        <input
          className="esri-component esri-widget--button esri-widget esri-interactive"
          type="button"
          id="switch-btn"
          value="SW"
          onClick={onSwitchClicked}
        />
      </div>
      <div id="switchDiv">
        <input
          className="esri-component esri-widget--button esri-widget esri-interactive"
          type="button"
          id="switch-view-btn"
          value={viewType === "2D" ? "3D" : "2D"}
          onClick={onViewClicked}
        />
      </div>
    </>
  );
};
export default WebSceneView;
