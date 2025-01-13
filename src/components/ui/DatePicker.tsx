"use client";
import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { Box } from "@mui/material";

interface Props {
  selectedDate: (date: dayjs.Dayjs) => void;
}

export const DateTimePicker: React.FC<Props> = ({ selectedDate }) => {
  const disablePastDates = (date: dayjs.Dayjs) => {
    return date.isBefore(dayjs(), "day"); // Deshabilita días pasados
  };

  const handleDateChange = (newDate: dayjs.Dayjs | null) => {
    if (newDate) {
      selectedDate(newDate); // Actualiza el estado con la fecha seleccionada
    }
  };

  return (
    <Box
      sx={{
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          disablePast
          shouldDisableDate={disablePastDates}
          defaultValue={dayjs()}
          onChange={handleDateChange}
          displayStaticWrapperAs='desktop'
          slotProps={{
            actionBar: { hidden: true },
          }}
          sx={{
            borderRadius: 2,
            border: "1px solid #a08d81",
            boxShadow: 2,
            minWidth: "250px",
            margin: "10px",
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};
