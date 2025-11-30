"use client";
import { Grid2 } from "@mui/material";
import { ResponsiveAppBar } from "@/components/layout/Navbar";
import { CustomSnackbar } from "@/components/ui/CustomSnackbar";
import { useSnackbar } from "@/hooks/useSnackbar";
import { ContentLogin } from "@/components/ui/Login/ContentLogin";
import { useLogin } from "@/hooks/useLogin";

export default function Login() {
  const { snackbar, showSnackbar, hideSnackbar } = useSnackbar();
  const { email, setEmail, password, setPassword, fieldErrors, handleSubmit } = useLogin(showSnackbar);           

  return (
    <Grid2 container justifyContent="center" height="100vh">
      <ResponsiveAppBar />
      <ContentLogin
        fieldErrors={fieldErrors}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        showSnackbar={showSnackbar}
      />
      <CustomSnackbar snackbar={snackbar} onClose={hideSnackbar} />
    </Grid2>
  );
}
