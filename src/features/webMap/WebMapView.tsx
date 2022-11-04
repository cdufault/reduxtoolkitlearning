import React, { useRef, useEffect } from "react";
import { changePortalItemId, updateWebMap } from "./webMapViewSlice";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import Bookmarks from "@arcgis/core/widgets/Bookmarks";
import Expand from "@arcgis/core/widgets/Expand";
import { changeViewType } from "../viewSwitcher/viewSwitcherSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const WebMapView = (): JSX.Element => {
  const mapDiv = useRef(null);
  const portalItemId = useAppSelector((state) => {
    return state.webMapView.portalItemId;
  });

  const viewType = useAppSelector((state) => {
    return state.viewSwitcher.viewType;
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

  // const onSwitchClicked = () => {
  //   if (portalItemId === "1e5040bf12764e37ad2d3ea92d062a34") {
  //     dispatch(changePortalItemId("aa1d3f80270146208328cf66d022e09c"));
  //   } else {
  //     dispatch(changePortalItemId("1e5040bf12764e37ad2d3ea92d062a34"));
  //   }
  // };

  const onViewClicked = () => {
    if (viewType === "2D") {
      dispatch(changeViewType("3D"));
    } else {
      dispatch(changeViewType("2D"));
    }
  };

  return (
    <>
      <div className="mapDiv" ref={mapDiv}></div>
      <div id="infoDiv">
        {/*<input*/}
        {/*  className="esri-component esri-widget--button esri-widget esri-interactive"*/}
        {/*  type="button"*/}
        {/*  id="switch-btn"*/}
        {/*  value="SM"*/}
        {/*  onClick={onSwitchClicked}*/}
        {/*/>*/}
      </div>
      <div id="switchDiv">
        <input
          className="esri-component esri-widget--button esri-widget esri-interactive"
          type="button"
          id="switch-view-btn"
          value={viewType === "3D" ? "2D" : "3D"}
          onClick={onViewClicked}
        />
      </div>
    </>
  );
};
export default WebMapView;
