"use client";

import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, Event, View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box } from "@mui/system";
import { EventProps } from "react-big-calendar";
import IconButton from "@mui/material/IconButton";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';


const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,

});

interface CustomEvent extends Event {
  phone?: string;
}

const events: CustomEvent[] = [
    {
    title: "Pedro Fermin",
    start: new Date("2025-11-29T10:00:00.000Z"),
    end: new Date("2025-11-29T12:00:00.000Z"),
    phone: "+5491153350958"
  },{
  title: "Evento de prueba",
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 2))},

  {
    title: "Camila Cabello",
    start: new Date("2025-11-29T10:00:00.000Z"),
    end: new Date("2025-11-29T12:00:00.000Z"),
  },
   {
    title: "Evento del 26",
    start: new Date("2025-11-29T14:00:00.000Z"),
    end: new Date("2025-11-29T16:00:00.000Z"),
  },
];``

export const CalendarComponent: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>("month");
  const [currentDate, setCurrentDate] = useState(new Date());

  const CustomEventComponent = ({ event }: EventProps<CustomEvent>) => {
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (event.phone) {
      window.open(`https://wa.me/${event.phone}?text=Hola,%20tienes%20un%20turno%20agendado.%20La%20cita%20es%20${event.title}`, "_blank");
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <span>{event.title}</span>
      {event.phone && (
        <IconButton 
          size="small" 
          onClick={handleWhatsAppClick}
          sx={{ padding: '2px', color: '#25D366' }}
        >
          <WhatsAppIcon fontSize="small" />
        </IconButton>
      )}
    </div>
  );
};
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
        components={{ event: CustomEventComponent }}
        style={{ height: 500 }}
      />
    </Box>
  );
};
