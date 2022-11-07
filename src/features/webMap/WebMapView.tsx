import React, { useRef, useEffect } from "react";
import { updateWebMap } from "./webMapViewSlice";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import Bookmarks from "@arcgis/core/widgets/Bookmarks";
import Expand from "@arcgis/core/widgets/Expand";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const WebMapView = (): JSX.Element => {
  const mapDiv = useRef(null);
  const portalItemId = useAppSelector((state) => {
    return state.webMapView.portalItemId;
  });

  const webMap = useAppSelector((state) => {
    return state.webMapView.webMap;
  });

  const dispatch = useAppDispatch();

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
      dispatch(updateWebMap(newWebMap));
    }
  }, [portalItemId]);

  return (
    <>
      <div className="mapDiv" ref={mapDiv}></div>
    </>
  );
};
export default WebMapView;
