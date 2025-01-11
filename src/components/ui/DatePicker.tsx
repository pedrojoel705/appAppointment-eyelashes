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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          maxWidth: 400,
          width: { xs: "110%", sm: "100%" },
          ml: { xs: -2, sm: "auto" },
          height: "100%",
          margin: "auto",
          backgroundColor: "#a08d81",
          borderRadius: 2,
          boxShadow: 3,
          p: 1,
        }}>
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
            width: "100%",
            "& .MuiPickersCalendarHeader-root": {
              margin: "0 auto",
            },
            "& .MuiDayCalendar-root": {
              margin: "0 auto",
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};
