import {Grid2 } from "@mui/material";
import ContentAbout from "../../components/ui/ContentAbout";
import { ResponsiveAppBar } from "../../components/layout/Navbar";

export default function About() {
  return (
    <Grid2 container justifyContent='center'>
      <ResponsiveAppBar />
      <ContentAbout />      
    </Grid2>
  );
}
