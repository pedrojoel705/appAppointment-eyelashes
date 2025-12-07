 "use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Avatar,
  Button,
  Paper,
  Grid2,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EditIcon from "@mui/icons-material/Edit";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PaidIcon from "@mui/icons-material/Paid";
import { LoadingBackdrop } from "@/components";
import { ResponsiveAppBar } from "@/components";


const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <LoadingBackdrop open={true} message="Cargando perfil..." />
      </Container>
    );
  }

  if (!session?.user) {
    return null;
  }

  const getInitials = () => {
    if (!session?.user?.name) return "U";
    const names = session.user.name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  // Datos hardcodeados para el ejemplo
  const upcomingAppointments = [
    { id: 1, date: "3 feb", service: "Corte cut", status: "Confirmado" },
    { id: 2, date: "6 feb", service: "Manicure", status: "Pagado" },
  ];

  const appointmentHistory = [
    { id: 1, service: "Corte de teñar", date: "20 / enero" },
    { id: 2, service: "Manicure", date: "15 / decembre" },
    { id: 3, service: "Corte de te...", date: "01 / diciembre" },
  ];

  const notifications = [
    { id: 1, message: "Nuevo turno confirmado", time: "32 min" },
    { id: 2, message: "Turno reprogramado", time: "2 días" },
    { id: 3, message: "Turno cancelado", time: "4 días" },
    { id: 4, message: "Recordatorio 24 horas", time: "6 días" },
  ];

  return (
    <>
    <ResponsiveAppBar />
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid2 container spacing={3}>
        {/* Columna Principal */}
        <Grid2 size={{ xs: 12, md: 8 }}>
          {/* Saludo y próximo turno */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h4" gutterBottom>
              Hola {session.user.name?.split(" ")[0]} 👋
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
              <Typography variant="body1" color="text.secondary">
                Tu próximo turno: 24 Ene - 14:00
              </Typography>
              <Button variant="contained" size="small">
                Reservar otro turno
              </Button>
            </Box>
          </Paper>

          {/* Próximos turnos */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Próximos turnos
            </Typography>
            <Grid2 container spacing={2} sx={{ mt: 1 }}>
              {upcomingAppointments.map((appointment) => (
                <Grid2 size={{ xs: 12, sm: 6 }} key={appointment.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle2" color="text.secondary">
                        {appointment.date}
                      </Typography>
                      <Typography variant="h6" sx={{ my: 1 }}>
                        {appointment.service}
                      </Typography>
                      <Chip
                        label={appointment.status}
                        size="small"
                        color={appointment.status === "Confirmado" ? "success" : "primary"}
                        icon={appointment.status === "Confirmado" ? <CheckCircleIcon /> : <PaidIcon />}
                      />
                    </CardContent>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
            <Button sx={{ mt: 2 }} color="primary">
              Ver todos los turnos
            </Button>
          </Paper>

          {/* Historial de turnos */}
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6">Historial de turnos</Typography>
              <Button size="small" color="primary">
                Ver más
              </Button>
            </Box>
            <List>
              {appointmentHistory.map((item, index) => (
                <Box key={item.id}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText
                      primary={item.service}
                      secondary={item.date}
                    />
                  </ListItem>
                  {index < appointmentHistory.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Paper>
        </Grid2>

        {/* Columna Derecha - Perfil y Notificaciones */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          {/* Perfil */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Perfil
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
              {session.user.image ? (
                <Avatar
                  alt={session.user.name || "Usuario"}
                  src={session.user.image}
                  sx={{ width: 80, height: 80, mb: 2 }}
                />
              ) : (
                <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: "secondary.main", fontSize: "2rem" }}>
                  {getInitials()}
                </Avatar>
              )}
              <Typography variant="h6">{session.user.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {session.user.email}
              </Typography>
            </Box>
            
            <List>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText primary="+54 9 911911911" />
              </ListItem>
            </List>

            <Button
              startIcon={<EditIcon />}
              fullWidth
              variant="outlined"
              sx={{ mt: 1 }}
              onClick={() => router.push("/complete-profile")}
            >
              Editar perfil
            </Button>
          </Paper>

          {/* Notificaciones */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Notificaciones
            </Typography>
            <List>
              {notifications.map((notification, index) => (
                <Box key={notification.id}>
                  <ListItem sx={{ px: 0, alignItems: "flex-start" }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <NotificationsIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={notification.message}
                      secondary={notification.time}
                    />
                  </ListItem>
                  {index < notifications.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Paper>
        </Grid2>
      </Grid2>
    </Container>
    </>
  );
};

export default Profile; 
