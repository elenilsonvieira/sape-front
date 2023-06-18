import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function Calendar() {

  const events = [
    {
      title: "ginastica",
      location: "patio",
      responsible: "rafael",
      start: "2023-06-21T10:00:00",
      end: "2023-06-21T12:00:00",
    },
    {
      title: "futebol",
      location: "quadra",
      responsible: "rafael",
      start: "2023-06-21T14:00:00",
      end: "2023-06-21T16:00:00",
    },

    {
      title: "volei",
      location: "patio",
      responsible: "igor",
      start: "2023-06-21T14:00:00",
      end: "2023-06-21T16:00:00",
    },
    {
      title: "ping pong",
      location: "mesa no restaurante",
      responsible: "igor",
      start: "2023-06-23T14:00:00",
      end: "2023-06-23T16:00:00",
    },
    {
      title: "futebol",
      location: "quadra",
      responsible: "rafael",
      start: "2023-06-25T14:00:00",
      end: "2023-06-25T16:00:00",
    },
    {
      title: "futebol",
      location: "quadra",
      responsible: "rafael",
      start: "2023-06-27T14:00:00",
      end: "2023-06-27T16:00:00",
    },
    {
      title: "futebol",
      location: "quadra",
      responsible: "igor",
      start: "2023-06-26T10:00:00",
      end: "2023-06-26T11:00:00",
    },
    {
      title: "futebol",
      location: "quadra",
      responsible: "rafael",
      start: "2023-06-25T15:00:00",
      end: "2023-06-25T17:00:00",
    },

  ];

  const eventContent = (eventInfo) => {
    return (
      <div>
        <h4>{eventInfo.event.title}</h4>
        <p>{eventInfo.event.extendedProps.location}</p>
        <p>{eventInfo.event.extendedProps.responsible}</p>
      </div>
    );
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        footerToolbar={{
          start: "prev,next today",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        eventContent={eventContent}
        height="90vh"
      />
    </div>
  );
}

export default Calendar;