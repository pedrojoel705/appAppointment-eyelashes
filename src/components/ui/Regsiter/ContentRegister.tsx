import {
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
  Divider,
  Grid2
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { LoadingBackdrop } from "../LoadingBackdrop";
import { registerUser } from "@/app/register/actions";
import { ButtonContained } from "@/components";
import { validators, validateForm, PHONE_PREFIX_ARGENTINA } from "@/utils/validators";
import { CustomSnackbar } from "../CustomSnackbar";
import { useSnackbar } from "@/hooks/useSnackbar";




interface FormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const ContentRegister= () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const { snackbar, showSnackbar, hideSnackbar } = useSnackbar();

  const validateFormFields = (): boolean => {
    const validationErrors = validateForm({
      firstName: [validators.required(firstName, "El nombre")],
      lastName: [validators.required(lastName, "El apellido")],
      phone: [validators.phone(phone)],
      email: [validators.email(email)],
      password: [validators.password(password, true)],
      confirmPassword: [validators.match(password, confirmPassword, "Las contraseñas")],
    });

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFormFields()) return;

    setLoading(true);
    try {

      const result = await registerUser({
        firstName,
        lastName,
        phone: `${PHONE_PREFIX_ARGENTINA}${phone}`,
        email,
        password,
      });

      if (!result.success) {
      
        if (result.fieldErrors) {
          setErrors(result.fieldErrors);
        } else {
          setErrors({ email: result.error || "Error al crear cuenta" });
        }
        showSnackbar(result.error || "Error al crear cuenta", "error");
        setLoading(false);
        return;
      }

     
      const loginResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (loginResult?.ok) {
        showSnackbar("Cuenta creada exitosamente", "success");
        setTimeout(() => router.push("/"), 1000);
      } else {
        showSnackbar("Cuenta creada, pero hubo un error al iniciar sesión", "warning");
        setTimeout(() => router.push("/login"), 1000);
      }
    } catch (error) {
      setErrors({ email: "Error al crear cuenta" });
      showSnackbar("Error inesperado al crear cuenta", "error");
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingBackdrop open={loading} message="Creando cuenta..." />
      
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: { xs: "90%", sm: "70%", md: "40%" },
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
        Crear cuenta
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <TextField
              required
              fullWidth
              label="Nombre"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={!!errors.firstName}
              helperText={errors.firstName}
              disabled={loading}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <TextField
              required
              fullWidth
              label="Apellido"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={!!errors.lastName}
              helperText={errors.lastName}
              disabled={loading}
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <TextField
              required
              fullWidth
              label="Teléfono"
              type="tel"
              placeholder="11 1234 5678 (código de área + número)"
              value={phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setPhone(value);
              }}
              error={!!errors.phone}
              helperText={errors.phone || "Ingrese su número con código de área (ej: 11, 221, 351)"}
              disabled={loading}
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <TextField
              required
              fullWidth
              label="Correo Electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              disabled={loading}
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <TextField
              required
              fullWidth
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              disabled={loading}
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <TextField
              required
              fullWidth
              label="Confirmar Contraseña"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              disabled={loading}
            />
          </Grid2>
        </Grid2>
        <ButtonContained
          loading={loading} 
          accionText="Creando cuenta..."
          text="Crear cuenta"
        />

        <Divider sx={{ my: 2 }}>O continúa con</Divider>

        <Button
          fullWidth
          variant="outlined"
          onClick={() => signIn("google", { callbackUrl: "/auth-callback" })}
          disabled={loading}
        >
          Continuar con Google
        </Button>

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="body2">
            ¿Ya tienes cuenta?{" "}
            <Button onClick={() => router.push("/login")} sx={{ textTransform: "none" }}>
              Inicia sesión
            </Button>
          </Typography>
        </Box>
      </Box>
    </Box>
    
    <CustomSnackbar snackbar={snackbar} onClose={hideSnackbar} />
    </>
  )
};