import { Grid, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import Box from "@mui/material/Box";

export const Logo = () => {
  return (
    <Link href='/'>
      <Box display='flex' justifyContent='center' alignItems='center'>
        <img src='/logoAndras-sf.png' alt='logo' width={170} height={80} />
      </Box>
    </Link>
  );
};
