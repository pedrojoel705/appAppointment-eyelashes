import React from "react";
import { Grid, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

export const SocialMediaList = () => {
  return (
    <Grid container justifyContent='center' spacing={2} sx={{ mt: 2 }}>
      <Grid item>
        <IconButton
          href='https://www.facebook.com'
          target='_blank'
          sx={{ color: "black" }}>
          <Facebook />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          href='https://www.twitter.com'
          target='_blank'
          sx={{ color: "black" }}>
          <Twitter />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          href='https://www.instagram.com'
          target='_blank'
          sx={{ color: "black" }}>
          <Instagram />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          href='https://www.linkedin.com'
          target='_blank'
          sx={{ color: "black" }}>
          <LinkedIn />
        </IconButton>
      </Grid>
    </Grid>
  );
};
