import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        bgcolor: "#c4b8b0",
        color: "white",
        py: 3,
        mt: 4,
        zIndex: 1,
      }}>
      <Container maxWidth='lg'>
        <Typography variant='body1' align='center'>
          © {new Date().getFullYear()} Tamara Lahses | Todos los derechos
          reservados
        </Typography>
        <Typography variant='body2' align='center' sx={{ mt: 1 }}>
          <Link href='#' color='inherit' underline='hover'>
            Política de Privacidad
          </Link>{" "}
          |{" "}
          <Link href='#' color='inherit' underline='hover'>
            Términos y Condiciones
          </Link>{" "}
          |{" "}
          <Link href='#' color='inherit' underline='hover'>
            Contacto
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};
