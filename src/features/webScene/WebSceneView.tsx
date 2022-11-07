import React, { useRef, useEffect } from "react";
import WebScene from "@arcgis/core/WebScene.js";
import SceneView from "@arcgis/core/views/SceneView";
import { updateWebScene } from "./webSceneViewSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const WebSceneView = (): JSX.Element => {
  const mapDiv = useRef(null);

  const portalItemId = useAppSelector((state) => {
    return state.webSceneView.webScenePortalItemId;
  });

  const webScene = useAppSelector((state) => {
    return state.webSceneView.webScene;
  });

  const dispatch = useAppDispatch();

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
        // dispatch(currentView(view));
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
    </>
  );
};
export default WebSceneView;
