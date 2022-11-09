import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Menu, MenuItem } from "@mui/material";
import { changePortalItemId } from "../webMap/webMapViewSlice";
import { changeWebScenePortalItemId } from "../webScene/webSceneViewSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { changeViewType } from "../viewSwitcher/viewSwitcherSlice";
import { LibraryAdd } from "@mui/icons-material";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { currentView, getGeoJson } from "./buttonAppBarSlice";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { enqueueSnackbar } = useSnackbar();
  const layerUrl =
    "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0";
  // '"https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0';

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const theViewToUpdate = useAppSelector((state) => {
    return state.buttonAppBar.theView;
  });

  const currentLoadingState = useAppSelector((state) => {
    return state.buttonAppBar.loading;
  });

  const viewType = useAppSelector((state) => {
    return state.viewSwitcher.viewType;
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentLoadingState) {
      enqueueSnackbar("Retrieving a geoJSON", {
        variant: "warning",
      });
    } else {
      enqueueSnackbar("Retrieved a geoJSON", {
        variant: "success",
      });
    }
  }, [currentLoadingState]);

  const handleClose = (event: any) => {
    if (viewType === "2D") {
      // in 2d mode
      if (event.currentTarget.textContent === "Map1") {
        dispatch(changePortalItemId("1e5040bf12764e37ad2d3ea92d062a34"));
      } else if (event.currentTarget.textContent === "Map2") {
        dispatch(changePortalItemId("aa1d3f80270146208328cf66d022e09c"));
      }
      enqueueSnackbar("Map Change fired", { variant: "info" });
    } else {
      if (event.currentTarget.textContent === "Scene1") {
        dispatch(
          changeWebScenePortalItemId("d1eb2b990f964e739a9cf3e0cc022b3c")
        );
      } else if (event.currentTarget.textContent === "Scene2") {
        dispatch(
          changeWebScenePortalItemId("3ec84e3c188c47fb89f69803ec729231")
        );
      }
      enqueueSnackbar("Scene Change fired", { variant: "info" });
    }
    setAnchorEl(null);
  };

  const onViewClicked = () => {
    if (viewType === "2D") {
      dispatch(changeViewType("3D"));
      enqueueSnackbar("View Changed 3D", { variant: "info" });
    } else {
      dispatch(changeViewType("2D"));
      enqueueSnackbar("View Changed 2D", { variant: "info" });
    }
  };

  const onAddClicked = () => {
    // webMap.map.updateFrom(view);
    //https://landscape11.arcgis.com/arcgis/rest/services/USA_Soils_Map_Units/featureserver
    // const layer = dispatch(getLayer);
    dispatch(getGeoJson());
    if (theViewToUpdate) {
      console.log("map exists");
      const layer = new FeatureLayer({
        url: layerUrl,
      });
      // @ts-ignore
      theViewToUpdate.map.add(layer, 0);
      enqueueSnackbar("Layer added to map.", {
        variant: "success",
      });
      dispatch(currentView(theViewToUpdate));
    }
    console.log("Save Clicked.");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            title="Select Map or Scene View."
            sx={{ mr: 2 }}
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose} disabled={viewType === "3D"}>
              Map1
            </MenuItem>
            <MenuItem onClick={handleClose} disabled={viewType === "3D"}>
              Map2
            </MenuItem>
            <MenuItem onClick={handleClose} disabled={viewType === "2D"}>
              Scene1
            </MenuItem>
            <MenuItem onClick={handleClose} disabled={viewType === "2D"}>
              Scene2
            </MenuItem>
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Test Application with Redux Toolkit
          </Typography>
          <IconButton
            aria-label="save"
            size="large"
            title="Add Layer."
            onClick={onAddClicked}
            disabled={viewType === "3D"}
          >
            <LibraryAdd />
          </IconButton>
          <Button
            variant="contained"
            size="large"
            title="Change View Type."
            onClick={onViewClicked}
          >
            {viewType === "2D" ? "3D" : "2D"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
