import React, { useRef, useEffect, useState } from "react";
import { changePortalItemId } from "./webMapViewSlice";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import Bookmarks from "@arcgis/core/widgets/Bookmarks";
import Expand from "@arcgis/core/widgets/Expand";
import { changeViewType } from "../ViewSwitcher/viewSwitcherSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const WebMapView = (): JSX.Element => {
  const mapDiv = useRef(null);
  const portalItemId = useAppSelector((state) => {
    return state.webMapView.portalItemId;
  });

  const viewType = useAppSelector((state) => {
    return state.viewSwitcher.viewType;
  });

  const dispatch = useAppDispatch();
  const switchButton = document.getElementById("switch-btn");

  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */
      const webmap = new WebMap({
        portalItem: {
          id: portalItemId, //"1e5040bf12764e37ad2d3ea92d062a34",
        },
      });

      const view = new MapView({
        container: mapDiv.current,
        map: webmap,
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

      // bonus - how many bookmarks in the webmap?
      webmap.when(() => {
        if (webmap.bookmarks && webmap.bookmarks.length) {
          console.log("Bookmarks: ", webmap.bookmarks.length);
        } else {
          console.log("No bookmarks in this webmap.");
        }
      });
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
          value="SM"
          onClick={() => {
            if (portalItemId === "1e5040bf12764e37ad2d3ea92d062a34") {
              dispatch(changePortalItemId("aa1d3f80270146208328cf66d022e09c"));
            } else {
              dispatch(changePortalItemId("1e5040bf12764e37ad2d3ea92d062a34"));
            }
          }}
        />
      </div>
      <div id="switchDiv">
        <input
          className="esri-component esri-widget--button esri-widget esri-interactive"
          type="button"
          id="switch-view-btn"
          value={viewType === "3D" ? "2D" : "3D"}
          onClick={() => {
            if (viewType === "2D") {
              dispatch(changeViewType("3D"));
            } else {
              dispatch(changeViewType("2D"));
            }
          }}
        />
      </div>
    </>
  );
};
export default WebMapView;
