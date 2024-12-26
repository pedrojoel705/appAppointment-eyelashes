"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
  Grid,
  Link,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ResponsiveAppBar } from "@/components/layout/Navbar";
import { useSnackbar } from "../hooks/Snackbar";

interface Errors {
  email?: string;
  password?: string;
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Errors>({});
  const { snackbar, showSnackbar, hideSnackbar } = useSnackbar();

  const router = useRouter();

  const validateFields = (): boolean => {
    const errors: Errors = {};

    if (!email.trim()) {
      errors.email = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Ingrese un correo electrónico válido";
    }

    if (!password.trim()) {
      errors.password = "La contraseña es requerida";
    } else if (password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateFields()) {
      showSnackbar(
        "Por favor, complete todos los campos correctamente",
        "warning"
      );
      return;
    }

    try {
      const response = await axios.post("/api/users/login", {
        email,
        password,
      });

      showSnackbar("Inicio de sesión exitoso", "success");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        "Ha ocurrido un error al intentar iniciar sesión. Por favor, inténtelo nuevamente.";
      showSnackbar(errorMessage, "error");
    }
  };

  return (
    <Grid container justifyContent='center' height='100vh'>
      <ResponsiveAppBar />
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
          <Grid container>
            <Grid item xs>
              <Link href='/recover-password' variant='body2'>
                ¿Olvidaste tu contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link href='/register' variant='body2'>
                ¿No tienes una cuenta? Regístrate
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={hideSnackbar}>
        <Alert
          onClose={hideSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
