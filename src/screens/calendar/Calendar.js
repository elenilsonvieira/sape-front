import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import "./calendar.css";
import { useHistory } from "react-router-dom";
import Modal from "../../componentes/Modal";
import {
  showSuccessMessage,
  showErrorMessage,
} from "../../componentes/Toastr";

export default (props) => {
  const events = props.schedulings;
  const history = useHistory();
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalEventInfo, setModalEventInfo] = useState(null);


  const openModal = (eventInfo) => {
    setModalEventInfo(eventInfo);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalEventInfo(null);
    setModalOpen(false);
  };

  const eventClickHandler = (info) => {
    openModal(info.event);
  };

  const eventContent = (eventInfo) => {
    return (
      <div>
        <h5>{eventInfo.event.title}</h5>
        <p>{eventInfo.event.extendedProps.location}</p>
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
        eventClick={eventClickHandler}
        dateClick={(info) => {
          // Lidar com o clique em datas
          const isConfirmed = window.confirm(`Deseja cadastrar um novo agendamento?`);
          if (isConfirmed) {
            history.push(`/createScheduling`);
          }
        }}
      />

      {isModalOpen && modalEventInfo && (
        <Modal onClose={closeModal}>
          {/* Conteúdo do modal, como informações detalhadas do evento */}
          
          <h3>Informações do Agendamento</h3>
          <p>Esporte: {modalEventInfo.title}</p>
          <p>Local: {modalEventInfo.extendedProps.location}</p>
          <button
            type="button"
            title="Deletar agendamento"
            className="btn btn-danger"
            onClick={(e) => {
              props.delete(modalEventInfo.id);
              closeModal();
            }}
          >
            Excluir
          </button>
          <button
            type="button"
            title="Vizualizar participantes"
            className="btn btn-info"
            onClick={(e) => props.viewParticipants(modalEventInfo.id)}
          >
            Participantes
          </button>
          <button
            type="button"
            title="Confirmar presença"
            className="btn btn-info"
            onClick={(e) => {
              props.addIsPresent(modalEventInfo.id);
              closeModal();
            }}
          >
            Confirmar
          </button>
          <button
            type="button"
            title="Atualizar agendamento"
            className="btn btn-info"
            onClick={(e) => {
              props.edit(modalEventInfo.id);
              closeModal();
            }}
          >
            Atualizar
          </button>
          {/* Adicione mais detalhes aqui */}
        </Modal>
      )}
    </div>
  );
};
