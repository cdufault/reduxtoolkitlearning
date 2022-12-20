import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Region from "./Region";
import Calendar from "./Calendar";
import J2Summary from "./J2Summary";
import RegionSummary from "./RegionSummary";
function LandingPage() {
  return (
    <div className="LandingPage-body">
      <header className="LandingPage-header">Header Text here!</header>
      <Box className="LandingPage-main" sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid>
            <Region />
          </Grid>
          <Grid>
            <RegionSummary />
          </Grid>
          <Grid>
            <Calendar />
          </Grid>
          <Grid>
            <J2Summary />
          </Grid>
        </Grid>
      </Box>
      <footer className="LandingPage-footer">Footer Text here!</footer>
    </div>
  );
}
export default LandingPage;
