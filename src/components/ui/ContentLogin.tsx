"use client";

import { TextField, Button, Box, Typography, Avatar, Grid2, Link, Divider } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { ILoginFormData } from "@/interface/ILoginFormData";
import { signIn } from "next-auth/react";

export const ContentLogin = ({fieldErrors, email, setEmail, password, setPassword, handleSubmit, showSnackbar}: ILoginFormData) => {
  
  const handleGoogleLogin = async () => {
    try {
      const result = await signIn("google", { 
        callbackUrl: "/",
        redirect: false,
      });
      
      if (result?.error) {
        console.error("Error en Google login:", result.error);
        showSnackbar("Error al iniciar sesión con Google. Por favor, intenta de nuevo.", "error");
      } else if (result?.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Error en Google login:", error);
      showSnackbar("Error al iniciar sesión con Google", "error");
    }
  };

  const handleFacebookLogin = () => {
    signIn("facebook", { callbackUrl: "/" });
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
        }}>
        <Avatar sx={{ m: 3, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Iniciar sesión
        </Typography>
        <Box component='form' noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Correo Electrónico'
            name='email'
            autoComplete='email'
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!fieldErrors.email}
            helperText={fieldErrors.email}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Contraseña'
            type='password'
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!fieldErrors.password}
            helperText={fieldErrors.password}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}>
            Iniciar sesión
          </Button>

          <Divider sx={{ my: 2 }}>O continúa con</Divider>

          <Grid2 container spacing={2}>
            <Grid2 size={12}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleLogin}
                sx={{
                  color: '#DB4437',
                  borderColor: '#DB4437',
                  '&:hover': {
                    borderColor: '#DB4437',
                    backgroundColor: 'rgba(219, 68, 55, 0.04)'
                  }
                }}
              >
                Google
              </Button>
            </Grid2>
          </Grid2>
            {/* Facebook deshabilitado - Descomentar cuando tengas las credenciales
            <Grid2 size={6}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FacebookIcon />}
                onClick={handleFacebookLogin}
                sx={{
                  color: '#1877F2',
                  borderColor: '#1877F2',
                  '&:hover': {
                    borderColor: '#1877F2',
                    backgroundColor: 'rgba(24, 119, 242, 0.04)'
                  }
                }}
              >
                Facebook
              </Button>
            </Grid2> */}

          <Grid2 container sx={{ mt: 2 }}>
            <Grid2 size="grow">
              <Link href='/recover-password' variant='body2'>
                ¿Olvidaste tu contraseña?
              </Link>
            </Grid2>
            <Grid2 size="auto">
              <Link href='/register' variant='body2'>
                ¿No tienes una cuenta? Regístrate
              </Link>
            </Grid2>
          </Grid2>

          <Grid2 container justifyContent="center" sx={{ mt: 2 }}>
            <Link href="mailto:support@example.com" variant='body2'>
              Contáctanos
            </Link>
          </Grid2>
        </Box>
      </Box>
    </>
  )
}