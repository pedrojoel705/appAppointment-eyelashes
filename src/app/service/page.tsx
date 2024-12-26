"use client";

import { ResponsiveAppBar } from "@/components/layout/Navbar";
import { ActionAreaCard } from "@/components/ui/Card";
import { Grid } from "@mui/material";

export default function Service() {
  return (
    <Grid container>
      <ResponsiveAppBar />
      <Grid item sx={{ height: "auto" }}>
        <ActionAreaCard />
      </Grid>
    </Grid>
  );
}
