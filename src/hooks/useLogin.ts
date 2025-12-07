import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AlertColor } from "@mui/material";

interface FieldErrors {
  email?: string;
  password?: string;
}

export const useLogin = (showSnackbar: (message: string, severity: AlertColor) => void) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateFields = (): boolean => {
    const errors: FieldErrors = {};
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
      showSnackbar("Por favor, complete todos los campos correctamente", "error");
      return;
    }

    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      console.log("SignIn result:", result);

      if (result?.ok) {
        showSnackbar("Inicio de sesión exitoso", "success");
        setTimeout(() => router.push("/"), 1000);
      } else if (result?.error) {
        console.error("Error de autenticación:", result.error);
        showSnackbar("Credenciales incorrectas", "error");
        setLoading(false);
      }
    } catch (error: any) {
      console.error("Error en login:", error);
      showSnackbar(`Error inesperado: ${error.message}`, "error");
      setLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, fieldErrors, loading, handleSubmit };
};