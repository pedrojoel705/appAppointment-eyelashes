"use client";

import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, Event, View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box } from "@mui/system";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events: Event[] = [
  {
    title: "Evento de prueba",
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 2)),
  },

  {
    title: "Evento del 26",
    start: new Date("2024-12-26T10:00:00.000Z"),
    end: new Date("2024-12-26T12:00:00.000Z"),
  },
];

export const CalendarComponent: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>("month");
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <Box style={{ height: "500px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        date={currentDate}
        view={currentView}
        onView={(view) => setCurrentView(view)}
        onNavigate={(date) => setCurrentDate(date)}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 500 }}
      />
    </Box>
  );
};
