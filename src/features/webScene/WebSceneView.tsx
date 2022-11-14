import React, { useRef, useEffect, useState } from "react";
import WebScene from "@arcgis/core/WebScene.js";
import SceneView from "@arcgis/core/views/SceneView";
import { useAppSelector } from "../../app/hooks";

const WebSceneView = (): JSX.Element => {
  const mapDiv = useRef(null);

  const [webScene, setWebScene] = useState<WebScene>();

  const portalItemId = useAppSelector((state) => {
    return state.webSceneView.webScenePortalItemId;
  });

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
        // dispatch(currentViewMap(view.map));
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
      setWebScene(newWebScene);
    }
  }, [portalItemId]);

  return (
    <>
      <div className="mapDiv" ref={mapDiv}></div>
    </>
  );
};
export default WebSceneView;
