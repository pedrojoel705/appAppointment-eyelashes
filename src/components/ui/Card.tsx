import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";

export const cardData = [
  {
    title: "Eyelash Extensions",
    description:
      "Enhance your natural beauty with our premium eyelash extensions, crafted for a flawless and long-lasting look.",
    image: "https://picsum.photos/id/1015/400/300",
  },
  {
    title: "Eyebrow Shaping",
    description:
      "Achieve perfectly sculpted brows that frame your face beautifully, tailored to your unique features.",
    image: "https://picsum.photos/id/1019/400/300",
  },
  {
    title: "Lash Lift",
    description:
      "Get a natural curl and lift to your lashes with our specialized lash lift service, no extensions needed.",
    image: "https://picsum.photos/id/1021/400/300",
  },
  {
    title: "Makeup Services",
    description:
      "Look stunning for any occasion with our professional makeup services, designed to enhance your best features.",
    image: "https://picsum.photos/id/1022/400/300",
  },
  {
    title: "Skin Care Treatments",
    description:
      "Rejuvenate your skin with our advanced skincare treatments, perfect for glowing and healthy-looking skin.",
    image: "https://picsum.photos/id/1025/400/300",
  },
];

export const ActionAreaCard = () => {
  return (
    <Grid container spacing={4} sx={{ mt: 4, mb: 5 }}>
      {cardData.map((card, index) => (
        <Grid
          key={index}
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: index % 2 === 0 ? "flex-start" : "flex-end",
          }}>
          <Card
            sx={{
              width: { xs: "90%", sm: "80%", md: "60%" },
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
              borderRadius: 4,
              mx: 2,
            }}>
            <CardActionArea
              sx={{
                display: "flex",
                flexDirection: index % 2 === 0 ? "row" : "row-reverse", // Alterna la dirección
                justifyContent: "space-between",
              }}>
              {/* Imagen */}
              <CardMedia
                component='img'
                sx={{
                  width: { xs: "50%", sm: "50%" },
                  height: "auto",
                  objectFit: { sm: "cover" },
                }}
                image={card.image}
                alt={card.title}
              />
              {/* Contenido */}
              <CardContent
                sx={{
                  width: { xs: "50%", sm: "50%" },
                  padding: { xs: 2, sm: 4 },
                }}>
                <Typography
                  gutterBottom
                  variant='h4'
                  component='div'
                  sx={{
                    textAlign: { xs: "center", sm: "left" },
                    fontSize: { xs: "0.5em", md: "1.5rem" },
                  }}>
                  {card.title}
                </Typography>
                <Typography
                  variant='body1'
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: "0.5em", sm: "1.25rem" },
                    textAlign: "justify",
                  }}>
                  {card.description}
                  <a href='#'>Ver mas</a>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
