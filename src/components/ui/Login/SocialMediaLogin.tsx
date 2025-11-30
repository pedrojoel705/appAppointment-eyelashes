import React from "react";
import { Grid2, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useSnackbar } from "@/hooks/useSnackbar";
import { SocialMediaLoginProps } from "@/interface/ILoginFormData";

export const SocialMediaLogin = ({ onGoogleLogin, onFacebookLogin }: SocialMediaLoginProps) => {
  const { showSnackbar } = useSnackbar();

  const handleGoogleLogin = () => {
    // Implementar lógica de Google OAuth
    showSnackbar("Login con Google en desarrollo", "info");
  };

  const handleFacebookLogin = () => {
    // Implementar lógica de Facebook OAuth
    showSnackbar("Login con Facebook en desarrollo", "info");
  };
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={6}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={onGoogleLogin}
          sx={{
            color: "#DB4437",
            borderColor: "#DB4437",
            "&:hover": {
              borderColor: "#DB4437",
              backgroundColor: "rgba(219, 68, 55, 0.04)",
            },
          }}
        >
          Google
        </Button>
      </Grid2>
      <Grid2 size={6}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<FacebookIcon />}
          onClick={onFacebookLogin}
          sx={{
            color: "#1877F2",
            borderColor: "#1877F2",
            "&:hover": {
              borderColor: "#1877F2",
              backgroundColor: "rgba(24, 119, 242, 0.04)",
            },
          }}
        >
          Facebook
        </Button>
      </Grid2>
    </Grid2>
  );
};
