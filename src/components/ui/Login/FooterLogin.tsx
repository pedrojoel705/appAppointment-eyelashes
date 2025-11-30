import { Grid2, Link } from "@mui/material";

export const FooterLogin = () => {
  return (
    <>
      <Grid2 container sx={{ mt: 2 }}>
        <Grid2 size="grow">
          <Link href="/recover-password" variant="body2">
            ¿Olvidaste tu contraseña?
          </Link>
        </Grid2>
        <Grid2 size="auto">
          <Link href="/register" variant="body2">
            ¿No tienes una cuenta? Regístrate
          </Link>
        </Grid2>
      </Grid2>
      <Grid2 container justifyContent="center" sx={{ mt: 2 }}>
        <Link href="mailto:support@example.com" variant="body2">
          Contáctanos
        </Link>
      </Grid2>
    </>
  );
};
