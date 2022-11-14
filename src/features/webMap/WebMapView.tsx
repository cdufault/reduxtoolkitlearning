import React, { useRef, useEffect, useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import Bookmarks from "@arcgis/core/widgets/Bookmarks";
import Expand from "@arcgis/core/widgets/Expand";
import { useAppSelector } from "../../app/hooks";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { useSnackbar } from "notistack";

const WebMapView = (): JSX.Element => {
  const mapDiv = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const [webMap, setWebMap] = useState<WebMap>();
  const portalItemId = useAppSelector((state) => {
    return state.webMapView.portalItemId;
  });

  const layerUrl = useAppSelector((state) => {
    return state.buttonAppBar.layerUrl;
  });

  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize webScene
       */
      if (webMap) {
        const view = new MapView({
          container: mapDiv.current,
          map: webMap,
        });

        const bookmarks = new Bookmarks({
          view,
          // allows bookmarks to be added, edited, or deleted
          editingEnabled: true,
        });

        const bookmarkExpand = new Expand({
          view,
          content: bookmarks,
          expanded: true,
        });

        // Add the widget to the top-right corner of the view
        view.ui.add(bookmarkExpand, "top-right");
      }
    }
  }, [webMap]);

  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */
      const newWebMap = new WebMap({
        portalItem: {
          id: portalItemId, //"1e5040bf12764e37ad2d3ea92d062a34",
        },
      });
      setWebMap(newWebMap);
    }
  }, [portalItemId]);

  useEffect(() => {
    if (webMap) {
      /**
       * Initialize application
       */
      if (layerUrl !== "") {
        const layer = new FeatureLayer({
          url: layerUrl,
        });

        // @ts-ignore
        webMap.add(layer, 0);
        enqueueSnackbar("Layer added to map.", {
          variant: "success",
        });
      }
    }
  }, [layerUrl, webMap, enqueueSnackbar]);

  return (
    <>
      <div className="mapDiv" ref={mapDiv}></div>
    </>
  );
};
export default WebMapView;
