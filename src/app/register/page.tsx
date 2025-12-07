"use client";
import { Grid2 } from "@mui/material";
import { ResponsiveAppBar } from "@/components/layout/Navbar";
import { CustomSnackbar } from "@/components/ui/CustomSnackbar";
import { useSnackbar } from "@/hooks/useSnackbar";
import { ContentRegistrer } from "@/components/ui/Regsitrer/ContentRegistrer";

export default function Register() {
  const { snackbar, showSnackbar, hideSnackbar } = useSnackbar();

  return (
    <Grid2 container justifyContent="center" height="100vh">
      <ResponsiveAppBar />
      <ContentRegistrer showSnackbar={showSnackbar} />
      <CustomSnackbar snackbar={snackbar} onClose={hideSnackbar} />
    </Grid2>
  );
}