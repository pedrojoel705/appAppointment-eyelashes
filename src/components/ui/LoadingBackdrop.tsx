import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

interface LoadingBackdropProps {
  open: boolean;
  message?: string;
}

export const LoadingBackdrop = ({ open, message = "Cargando..." }: LoadingBackdropProps) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CircularProgress color="inherit" size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
};
