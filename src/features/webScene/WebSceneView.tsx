import React, { useRef, useEffect } from "react";
import WebScene from "@arcgis/core/WebScene.js";
import SceneView from "@arcgis/core/views/SceneView";

const WebSceneView = (): JSX.Element => {
  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */
      const webScene = new WebScene({
        portalItem: {
          id: "d1eb2b990f964e739a9cf3e0cc022b3c",
        },
      });

      const view = new SceneView({
        container: mapDiv.current,
        map: webScene,
      });
    }
  }, []);

  return (
    <>
      <div className="mapDiv" ref={mapDiv}></div>
    </>
  );
};
export default WebSceneView;
