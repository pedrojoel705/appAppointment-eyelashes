"use client";

import React, { useEffect, useState } from "react";
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
import ContainedButton from "@/components/ui/ContainedButton";
import { getServiceList } from "@/services/api/serviceFetch";
import { IServiceType } from "@/interface/IServiceData";
import {
  getAppointmentAvailable,
  setAppointment,
} from "@/services/api/appointmentFetch";
import { IAppoimentData } from "@/interface/IAppoinmentData";
import { DateTimePicker } from "@/components/ui/DatePicker";
import dayjs from "dayjs";
import { set } from "mongoose";

const formatTimeSlot = (dateString: string) => {
  const date = new Date(dateString);
  // Ya no necesitamos ajustar la hora aquí, ya que trabajaremos con la hora correcta
  return date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const AppointmentScheduler: React.FC = () => {
  const [selectdDate, setSelectdDate] = useState<dayjs.Dayjs | null>(null);
  const [serviceType, setServiceType] = useState<IServiceType>();
  const [appointmentAvailable, setAppointmentAvailable] =
    useState<IAppoimentData>();
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const availableSlots =
    appointmentAvailable?.availableAppointments?.map((appointment) =>
      formatTimeSlot(appointment.startTime)
    ) || [];

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
        const service = serviceType?.find((s) => s._id === selectedService);
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
      // Crear fecha de inicio y fin para el día seleccionado
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
  }, []);

  useEffect(() => {
    if (selectedService && selectdDate) {
      fetchAppointmentData(selectedService);
    }
  }, [selectdDate]);

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

          mx: { xs: 2, sm: 3, md: "auto" },
        }}>
        <Typography
          variant='h5'
          mb={3}
          textAlign={{ xs: "center", sm: "left" }}>
          🌟 ¡Elige el horario perfecto para disfrutar de tu servicio! 🌟
        </Typography>

        <DateTimePicker
          selectedDate={(date: dayjs.Dayjs) => setSelectdDate(date)}
        />

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
            <Grid container spacing={2}>
              {availableSlots.map((slot, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
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
