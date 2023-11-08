import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";


export default (props) => {

  const events = props.schedulings;

  const eventContent = (eventInfo) => {
    return (
      <div>
        <h4>{eventInfo.event.title}</h4>
        <p>{eventInfo.event.extendedProps.location}</p>
        <button
              type="button"
              title="Exclude"
              className="btn btn-danger"
              onClick={(e) => props.delete(eventInfo.event.extendedProps.schedulingId)}
            >
              Excluir
            </button>
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
          locale={ptBrLocale}
        />
      </div>
    );
};