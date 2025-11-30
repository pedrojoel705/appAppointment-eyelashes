"use client";
import React, { useEffect, useState } from "react";

import dayjs from "dayjs";

import {
  MenuItem,
  Select,
  Button,
  Container,
  Grid2,
  styled,
  useTheme,
  Theme,
  CSSObject,
  Box,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";

import { DateTimePicker } from "@/components/ui/DatePicker";
import ContainedButton from "@/components/ui/ContainedButton";
import { getServiceList } from "@/services/api/serviceFetch";
import { IServiceType } from "@/interface/IServiceData";
import {
  getAppointmentAvailable,
  setAppointment,
} from "@/services/api/appointmentFetch";
import { IAppoimentData } from "@/interface/IAppoinmentData";

const formatTimeSlot = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const menuItems = [
  { name: "Turnos", icon: <CalendarTodayIcon />, url: "/turnos" },
  { name: "Historico", icon: <HistoryIcon />, url: "/historico" },
  { name: "Perfil", icon: <PersonIcon />, url: "/perfil" },
];
const pages = [
  { title: "Inicio", url: "/" },
  { title: "Sobre Mi", url: "/about" },
  { title: "Servicios", url: "/service" },
  { title: "Contacto", url: "#" },
];

const AppointmentScheduler: React.FC = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectdDate, setSelectdDate] = useState<dayjs.Dayjs | null>(null);
  const [serviceType, setServiceType] = useState<IServiceType>();
  const [appointmentAvailable, setAppointmentAvailable] =
    useState<IAppoimentData>();
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  const availableSlots =
    appointmentAvailable?.availableAppointments?.map((appointment) =>
      formatTimeSlot(appointment.startTime)
    ) || [];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleServiceChange = async (event: any) => {
    const serviceId = event.target.value as string;
    setSelectedService(serviceId);
    setSelectedSlot(null);

    if (serviceId && selectdDate) {
      await fetchAppointmentData(serviceId);
    }
  };

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
  };

  const handleConfirm = async () => {
    try {
      if (selectedService && selectedSlot && selectdDate) {
        await fetchSetAppointment();
        const service = serviceType?.find((s: any) => s._id === selectedService);
        setSelectedSlot(null);
        setSelectedService("");
        setSelectdDate(null);

        //!pediente de revisar para colocar el el snackbar
        console.log(
          `¡Reserva confirmada! Has reservado "${service?.name}" para las ${selectedSlot}.`
        );
      }
    } catch (error) {
      console.error("Error setting appointment", error);
    }
  };

  const fetchAppointmentData = async (selectedService: string) => {
    if (!selectdDate) return;

    try {
      const startOfDay = new Date(selectdDate.toDate());
      startOfDay.setHours(9, 0, 0, 0);

      const endOfDay = new Date(selectdDate.toDate());
      endOfDay.setHours(19, 0, 0, 0);

      const responseAppointments = await getAppointmentAvailable(
        selectedService,
        selectdDate.toDate(),
        startOfDay,
        endOfDay
      );

      console.log(selectdDate.toDate(), startOfDay, endOfDay);
      setAppointmentAvailable(responseAppointments);
    } catch (error) {
      console.error("Error getting appointment list", error);
    }
  };

  //TODO:REVISAR ESTA FUNCION PARA PASAR EL ID DEL USER QUE ESTA LOGUEADO recordar quet tengo userId harcodeado en el fetch de setAppointment
  const fetchSetAppointment = async () => {
    if (!selectdDate || !selectedSlot || !selectedService) return;

    const selectedServiceData = serviceType?.find(
      (s) => s._id === selectedService
    );
    if (!selectedServiceData) return;

    const [hours, minutes] = selectedSlot.split(":").map(Number);

    const startDate = selectdDate
      .hour(hours)
      .minute(minutes)
      .second(0)
      .millisecond(0);

    const endDate = startDate.add(selectedServiceData.duration, "minute");

    try {
      await setAppointment(
        selectedService,
        selectdDate.toDate(),
        startDate.toDate(),
        endDate.toDate()
      );

      console.log("Appointment set successfully");
    } catch (error) {
      console.error("Error setting appointment", error);
    }
  };

  const fetchServiceData = async () => {
    try {
      const response = await getServiceList();
      setServiceType(response);
    } catch (error) {
      console.error("Error getting service list", error);
    }
  };

  useEffect(() => {
    fetchServiceData();
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (selectedService && selectdDate) {
      fetchAppointmentData(selectedService);
    }
  }, [selectdDate]);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        direction: "column",
        minHeight: "100vh",
        paddingBottom: "60px",
        width: { xs: "100%", sm: "auto" },
      }}>
      <CssBaseline />

      <AppBar
        position='fixed'
        open={open}
        sx={{
          backgroundColor: "#c4b8b0",
        }}>
        <Toolbar>
          <IconButton
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}>
            <MenuIcon />
          </IconButton>{" "}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                href={page.url}
                sx={{ my: 2, mx: 2, color: "black", display: "block" }}>
                {page.title}
              </Button>
            ))}
          </Box>
        </Toolbar>

        <Grid2></Grid2>
      </AppBar>

      <Drawer variant='permanent' open={open} z-index='999'>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>

      {/* Contenido principal */}
      <Box
        sx={{
          flexGrow: 1, // Esto asegura que el contenido se expanda y empuje al footer
          paddingTop: 8, // Ajuste para no solaparse con la barra de navegación
        }}>
        <DrawerHeader />
        <Box sx={{ display: "flex", justifyContent: "start" }}>
          <Typography
            variant='h5'
            mb={3}
            mt={3}
            textAlign={{ xs: "center", sm: "left" }}>
            🌟 ¡Elige el horario perfecto para disfrutar de tu servicio! 🌟
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 3,
            padding: { xs: 2, sm: 3 },
            width: { xs: "340px", sm: "auto" },
          }}>
          <Container maxWidth='md' sx={{ width: "100%" }}>
            {isClient ? (
              <DateTimePicker selectedDate={(date) => setSelectdDate(date)} />
            ) : (
              <Box
                sx={{ height: "56px", bgcolor: "grey.100", borderRadius: 1 }}
              />
            )}

            {/* Selección de servicio */}
            {selectdDate && (
              <Box mb={3}>
                <Typography variant='body1' mb={1}>
                  Selecciona un servicio:
                </Typography>
                <Select
                  fullWidth
                  value={selectedService}
                  onChange={(e: any) => handleServiceChange(e)}
                  displayEmpty>
                  <MenuItem value='' disabled>
                    Selecciona un servicio
                  </MenuItem>
                  {serviceType?.map((service) => (
                    <MenuItem key={service._id} value={service._id}>
                      {service.name} ({service.duration} minutos)
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            )}

            {/* Selección de horario */}
            {selectedService && (
              <Box mb={3}>
                <Typography variant='body1' mb={1}>
                  Horarios disponibles:
                </Typography>
                <Grid2 container spacing={2}>
                  {availableSlots.map((slot, index) => (
                    <Grid2 size={{ xs: 6, sm: 4, md: 3 }} key={index}>
                      <Button
                        variant={
                          selectedSlot === slot ? "contained" : "outlined"
                        }
                        onClick={() => handleSlotSelect(slot)}
                        fullWidth
                        sx={{
                          textTransform: "none",
                          color: selectedSlot === slot ? "white" : "#a08d81",
                          backgroundColor:
                            selectedSlot === slot ? "#a08d81" : "",
                          borderColor: "#a08d81",
                          ":hover": {
                            backgroundColor: "#a08d81",
                            color: "white",
                            borderColor: "white",
                          },
                        }}>
                        {slot}
                      </Button>
                    </Grid2>
                  ))}
                </Grid2>
              </Box>
            )}

            {/* Botón de confirmación */}
            <Grid2 display='flex' justifyContent='center'>
              <ContainedButton
                onClick={handleConfirm}
                disabled={!selectedService || !selectedSlot}
                label='Confirmar reserva'
              />
            </Grid2>
          </Container>
        </Box>
      </Box>
    </Container>
  );
};

export default AppointmentScheduler;
