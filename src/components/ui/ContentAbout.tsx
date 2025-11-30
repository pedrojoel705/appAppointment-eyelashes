import { Box, Typography, Avatar, Button, Divider, Grid2 } from "@mui/material";

export default function ContentAbout() {
  return (
    <Grid2
        size={{ xs: 12, sm: 10, md: 8 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          padding: 4,
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          mb: 4,
        }}>
        {/* Imagen de perfil */}
        <Avatar
          alt='Tamara Rodriguez'
          src='/path-to-your-image.jpg'
          sx={{
            width: 120,
            height: 120,
            mb: 2,
            border: "5px solid #fff",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        />

        {/* Título */}
        <Typography
          variant='h3'
          fontWeight={600}
          sx={{
            mb: 2,
            fontSize: { xs: "2rem", sm: "2.5rem" },
            color: "#333",
            textAlign: "center",
          }}>
          Hola, soy Tamara Rodriguez
        </Typography>

        {/* Descripción */}
        <Typography
          variant='body1'
          sx={{
            mb: 3,
            fontSize: { xs: "1rem", sm: "1.2rem" },
            color: "#555",
            textAlign: "center",
          }}>
          Soy especialista en extensiones de pestañas, con años de experiencia
          realzando la belleza de mis clientes. Mi pasión por el detalle y la
          perfección me ha permitido ofrecer resultados excepcionales, brindando
          confianza y satisfacción.
        </Typography>

        {/* Botón de contacto */}
        <Button
          variant='contained'
          color='primary'
          sx={{
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 500,
            padding: "10px 20px",
            borderRadius: 3,
            mb: 3,
          }}>
          Contactame
        </Button>

        <Divider sx={{ my: 4, width: "100%" }} />

        {/* Sección de imágenes e información adicional */}
        <Grid2 container spacing={4}>
          {/* Contenedor de imagen con texto */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                width: "100%",
                height: { xs: "200px", sm: "250px" },
                backgroundImage: "url('/path-to-your-image-1.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 2,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Typography
              variant='h6'
              fontWeight={500}
              sx={{
                mt: 2,
                fontSize: { xs: "1rem", sm: "1.2rem" },
                color: "#333",
              }}>
              Cuidado Personalizado
            </Typography>
            <Typography
              variant='body2'
              sx={{ color: "#555", textAlign: "justify", mt: 1 }}>
              Cada cliente es único, y mi prioridad es brindar un servicio
              personalizado que resalte la belleza natural de cada persona.
            </Typography>
          </Grid2>

          {/* Contenedor de imagen con texto */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                width: "100%",
                height: { xs: "200px", sm: "250px" },
                backgroundImage: "url('/path-to-your-image-2.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 2,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Typography
              variant='h6'
              fontWeight={500}
              sx={{
                mt: 2,
                fontSize: { xs: "1rem", sm: "1.2rem" },
                color: "#333",
              }}>
              Atención a los Detalles
            </Typography>
            <Typography
              variant='body2'
              sx={{ color: "#555", textAlign: "justify", mt: 1 }}>
              Mi dedicación y enfoque en los detalles garantizan resultados
              impecables en cada sesión.
            </Typography>
          </Grid2>
        </Grid2>
      </Grid2>
    );
}