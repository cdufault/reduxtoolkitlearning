import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu, MenuItem } from "@mui/material";
import { changePortalItemId } from "../webMap/webMapViewSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clickOptions } from "@testing-library/user-event/dist/click";

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const viewType = useAppSelector((state) => {
    return state.viewSwitcher.viewType;
  });
  const dispatch = useAppDispatch();

  const handleClose = (event: any) => {
    if (viewType === "3D") {
      // in 2d mode
      if (event.currentTarget.textContent === "Map1") {
        dispatch(changePortalItemId("1e5040bf12764e37ad2d3ea92d062a34"));
      } else if (event.currentTarget.textContent === "Map2") {
        dispatch(changePortalItemId("aa1d3f80270146208328cf66d022e09c"));
      }
    } else {
      if (event.currentTarget.textContent === "Scene1") {
        dispatch(changePortalItemId("d1eb2b990f964e739a9cf3e0cc022b3c"));
      } else if (event.currentTarget.textContent === "Scene2") {
        dispatch(changePortalItemId("3ec84e3c188c47fb89f69803ec729231"));
      }
    }
    setAnchorEl(null);
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
            <MenuItem onClick={handleClose}>Map1</MenuItem>
            <MenuItem onClick={handleClose}>Map2</MenuItem>
            <MenuItem onClick={handleClose}>Scene1</MenuItem>
            <MenuItem onClick={handleClose}>Scene2</MenuItem>
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Test Application with Redux Toolkit
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
