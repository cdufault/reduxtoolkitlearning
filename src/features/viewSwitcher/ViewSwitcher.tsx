import WebSceneView from "../webScene/WebSceneView";
import WebMapView from "../webMap/WebMapView";
import { useAppSelector } from "../../app/hooks";

const ViewSwitcher = (): JSX.Element => {
  const viewType = useAppSelector((state) => {
    return state.viewSwitcher.viewType;
  });

  //https://sampleserver6.arcgisonline.com/arcgis/rest/services/Military/FeatureServer

  return <>{viewType === "3D" ? <WebSceneView /> : <WebMapView />}</>;
};
export default ViewSwitcher;
