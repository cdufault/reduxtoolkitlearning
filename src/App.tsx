import React from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import ViewSwitcher from "./features/ViewSwitcher/ViewSwitcher";

import "./App.css";

export default function App() {
  const view = useAppSelector((state) => state.webMapView.portalItemId);
  return (
    <>
      <ViewSwitcher />
    </>
  );
}
