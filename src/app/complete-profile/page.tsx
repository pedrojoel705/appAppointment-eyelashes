"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Avatar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { LoadingBackdrop } from "@/components/ui/LoadingBackdrop";
import { CustomSnackbar } from "@/components/ui/CustomSnackbar";
import { useSnackbar } from "@/hooks/useSnackbar";
import { completeProfile } from "./actions";
import { validators } from "@/utils/validators";

export default function CompleteProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { snackbar, showSnackbar, hideSnackbar } = useSnackbar();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones con validators
    const phoneError = validators.phone(phone);
    if (phoneError) {
      showSnackbar(phoneError, "error");
      return;
    }

    if (password) {
      const passwordError = validators.password(password, false);
      if (passwordError) {
        showSnackbar(passwordError, "error");
        return;
      }

      const matchError = validators.match(password, confirmPassword, "Las contraseñas");
      if (matchError) {
        showSnackbar(matchError, "error");
        return;
      }
    }

    setLoading(true);

    try {
      const result = await completeProfile({
        email: session?.user?.email || "",
        phone,
        password: password || undefined,
      });

      if (!result.success) {
        showSnackbar(result.error || "Error al actualizar el perfil", "error");
        setLoading(false);
        return;
      }

   
      await update({
        ...session,
        user: {
          ...session?.user,
          phone: phone,
        },
      });

      showSnackbar("¡Perfil actualizado exitosamente!", "success");
      setTimeout(() => router.push("/"), 1000);
    } catch (err) {
      showSnackbar("Error inesperado al actualizar el perfil", "error");
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography>Cargando...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <>
      <LoadingBackdrop open={loading} message="Actualizando perfil..." />

      <Container maxWidth="sm">
        <Box sx={{ mt: 8, mb: 4 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <PersonIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Completa tu perfil
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: "center" }}>
                Necesitamos algunos datos adicionales para completar tu registro
              </Typography>

              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3, width: "100%" }}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="phone"
                  label="Número de teléfono"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setPhone(value);
                  }}
                  placeholder="11 1234 5678 (código de área + número)"
                  helperText="Ingrese su número con código de área (ej: 11, 221, 351)"
                  disabled={loading}
                />

                <Typography variant="body2" sx={{ mt: 3, mb: 1 }}>
                  Contraseña (opcional - para login sin Google)
                </Typography>

                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />

                <TextField
                  margin="normal"
                  fullWidth
                  name="confirmPassword"
                  label="Confirmar contraseña"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loading}
                >
                  Guardar información
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
      
      <CustomSnackbar snackbar={snackbar} onClose={hideSnackbar} />
    </>
  );
}
