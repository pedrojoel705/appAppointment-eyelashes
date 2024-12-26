"use client";

import React, { useState } from "react";
import {
  Box,
  MenuItem,
  Select,
  Button,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import { ResponsiveAppBar } from "@/components/layout/Navbar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ContainedButton from "@/components/ui/ContainedButton";

interface Service {
  id: string;
  name: string;
  duration: number;
}

const services: Service[] = [
  { id: "1", name: "Corte de cabello", duration: 30 },
  { id: "2", name: "Manicura", duration: 45 },
  { id: "3", name: "Masaje", duration: 60 },
];

const availableSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
];

const AppointmentScheduler: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const handleServiceChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedService(event.target.value as string);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
  };

  const handleConfirm = () => {
    if (selectedService && selectedSlot) {
      const service = services.find((s) => s.id === selectedService);
      alert(
        `¡Reserva confirmada! Has reservado "${service?.name}" para las ${selectedSlot}.`
      );
    } else {
      alert("Por favor, selecciona un servicio y un horario.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}>
      <ResponsiveAppBar />
      <Container
        maxWidth='md'
        sx={{
          mt: 4,
          mb: 4,
          p: 4,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
          width: { xs: "92%" },
          // Ajuste de márgenes para pantallas pequeñas
          mx: { xs: 2, sm: 3, md: "auto" }, // xs: margen pequeño, md: centrado automático
        }}>
        <Typography
          variant='h5'
          mb={3}
          textAlign={{ xs: "center", sm: "left" }}>
          🌟 ¡Elige el horario perfecto para disfrutar de tu servicio! 🌟
        </Typography>

        {/* Selección de servicio */}
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
            {services.map((service) => (
              <MenuItem key={service.id} value={service.id}>
                {service.name} ({service.duration} minutos)
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Selección de horario */}
        {selectedService && (
          <Box mb={3}>
            <Typography variant='body1' mb={1}>
              Horarios disponibles:
            </Typography>
            <Grid container spacing={2}>
              {availableSlots.map((slot) => (
                <Grid item xs={6} sm={4} md={3} key={slot}>
                  <Button
                    variant={selectedSlot === slot ? "contained" : "outlined"}
                    onClick={() => handleSlotSelect(slot)}
                    fullWidth
                    sx={{
                      textTransform: "none",
                      color: selectedSlot === slot ? "white" : "#a08d81",
                      backgroundColor: selectedSlot === slot ? "#a08d81" : "",
                      borderColor: "#a08d81",
                      ":hover": {
                        backgroundColor: "#a08d81",
                        color: "white",
                        borderColor: "white",
                      },
                    }}>
                    {slot}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Botón de confirmación */}
        <Grid item display='flex' justifyContent='center'>
          {" "}
          <ContainedButton
            onClick={handleConfirm}
            disabled={!selectedService || !selectedSlot}
            label='Confirmar reserva'
          />
        </Grid>
      </Container>
    </Box>
  );
};

export default AppointmentScheduler;
