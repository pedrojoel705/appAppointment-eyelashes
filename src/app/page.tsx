"use client";

import { Box, Grid, Typography } from "@mui/material";
import { SocialMediaList } from "@/components/layout/SocialMediaList";
import { ResponsiveAppBar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <Grid container>
      {/* NavBar */}
      <ResponsiveAppBar />

      {/* Main Container */}
      <Grid container justifyContent='center' height='100vh'>
        <Grid
          container
          sx={{
            border: "1px solid black",
            borderRadius: "8px",
            width: "90%",
            height: { xs: "auto", sm: "75vh" },
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#f5f5f5",
            p: 4,
          }}>
          {/* Sección de texto e íconos en el lado izquierdo */}
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}>
            <Box>
              <Typography
                variant='h2'
                fontWeight={400}
                fontFamily='Helvetica'
                sx={{
                  mb: 2,
                  fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
                }}>
                Tamara Rodriguez
              </Typography>

              <Typography
                variant='h4'
                sx={{
                  fontStyle: "italic",
                  mb: 2,
                  fontSize: { xs: "1.5rem", sm: "2rem" },
                }}>
                Transforma miradas, Eleva confianza
              </Typography>

              <Typography
                variant='h6'
                sx={{
                  textAlign: "justify",
                  mb: 3,
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                }}>
                Como especialista en extensiones de pestañas, realzas la belleza
                con precisión y arte en cada detalle.
              </Typography>
            </Box>

            {/* Social Media */}
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "flex-start" },
              }}>
              <SocialMediaList />
            </Box>
          </Grid>

          {/* Imagen en el lado derecho */}
          <Grid
            item
            xs={12}
            sm={5}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px", // Borde redondeado
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Sombra suave
              border: "2px solid #f8debe", // Borde gris claro
              overflow: "hidden", // Asegura que la imagen no se desborde
            }}>
            <img
              src='/section-1.png'
              alt='Eyelashes'
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
