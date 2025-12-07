import {
  TextField,
  Button,
  Box,
  Typography,
  Avatar, 
  Divider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ILoginFormData } from "@/interface/ILoginFormData";
import { SocialMediaLogin } from "./SocialMediaLogin";
import { FooterLogin } from "./FooterLogin";
import { signIn } from "next-auth/react";
import { ButtonContained } from "@/components";


export const ContentLogin = ({
  fieldErrors,
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  loading,
}: ILoginFormData) => {

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/auth-callback" });
  };

  const handleFacebookLogin = () => {
    signIn("facebook", { callbackUrl: "/auth-callback" });
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: { sx: "40%", sm: "30%" },
          backgroundColor: "white",
          mb: 10,
          mx: 2,
          p: 4,
          mt: 2,
          borderRadius: 4,
        }}
      >
        <Avatar sx={{ m: 3, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!fieldErrors.email}
            helperText={fieldErrors.email}
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!fieldErrors.password}
            helperText={fieldErrors.password}
            disabled={loading}
          />
         <ButtonContained
          loading={loading}
          accionText="Iniciando sesión..."
          text="Iniciar sesión"
        />

          <Divider sx={{ my: 2 }}>O continúa con</Divider>

          <SocialMediaLogin
            onGoogleLogin={handleGoogleLogin}
            onFacebookLogin={handleFacebookLogin}
          />

          <FooterLogin />
        </Box>
      </Box>
    </>
  );
};
