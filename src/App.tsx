import React from "react";
// import {  useAppSelector } from "./app/hooks";
import ViewSwitcher from "./features/viewSwitcher/ViewSwitcher";

import "./App.css";
import ButtonAppBar from "./features/appBar/ButtonAppBar";
import LandingPage from "./features/LandingPage/LandingPage";

export default function App() {
  // const view = useAppSelector((state) => state.webMapView.portalItemId);
  return (
    <>
      <LandingPage />
      {/*<ButtonAppBar />*/}
      {/*<ViewSwitcher />*/}
    </>
  );
}
