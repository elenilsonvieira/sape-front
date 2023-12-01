import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import "./calendar.css";
import { useHistory } from "react-router-dom";
import Modal from "../../componentes/Modal";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  showSuccessMessage,
  showErrorMessage,
} from "../../componentes/Toastr";

export default (props) => {
  const events = props.schedulings;
  const history = useHistory();
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalEventInfo, setModalEventInfo] = useState(null);
  const [isNewAgendamentoModalOpen, setNewAgendamentoModalOpen] = useState(false);


  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateModal, setSelectedDateModal] = useState(null);

  const openModal = (eventInfo) => {
    console.log('Modal Event Info:', eventInfo);
    setModalEventInfo(eventInfo);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalEventInfo(null);
    setModalOpen(false);
  };

  const openNewAgendamentoModal = () => {
    setNewAgendamentoModalOpen(true);
  };

  const closeNewAgendamentoModal = () => {
    setNewAgendamentoModalOpen(false);
  };

  const eventClickHandler = (info) => {
    openModal(info.event);
  };

  const eventContent = (eventInfo) => {
    const status = eventInfo.event.extendedProps.status;
  
    return (
      <div className={status === 'CONFIRMED' ? 'CONFIRMED' : 'PENDING'}>
        <h5 className="textEvent">{eventInfo.event.title}</h5>
        <p className="ptext">{eventInfo.event.extendedProps.location}</p>
      </div>
    );
  };
  const dateClickHandler = (info) => {
    const clickedDateUTC = new Date(info.dateStr + 'T00:00:00Z');
    
    const day = String(clickedDateUTC.getUTCDate()).padStart(2, '0');
    const month = String(clickedDateUTC.getUTCMonth() + 1).padStart(2, '0');
    const year = clickedDateUTC.getUTCFullYear();

    const formattedDate = `${year}-${month}-${day}`;
    const formattedDateModal = `${day}/${month}/${year}`;

    openNewAgendamentoModal();
    setSelectedDate(formattedDate);
    setSelectedDateModal(formattedDateModal);
  };



  const confirmNewAgendamento = () => {
    if (selectedDate) {
      const formattedDate = encodeURIComponent(selectedDate);
      history.push(`/createScheduling?date=${formattedDate}`);
      closeNewAgendamentoModal();
    }
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
        dateClick={dateClickHandler}
        slotDuration="00:15:00"
      />

      {isModalOpen && modalEventInfo && (
        <Modal onClose={closeModal}>
          <h3>Informações do Agendamento</h3>
          <p>Esporte: {modalEventInfo.title}</p>
          <p>Local: {modalEventInfo.extendedProps.location}</p>
          <button
            type="button"
            title="Deletar agendamento"
            className="btn btn-danger Buttondefault "
            onClick={(e) => {
              props.delete(modalEventInfo.id);
              closeModal();
            }}
          >
            Excluir
          </button>
          <button
            type="button"
            title="Vizualizar participantes "
            className="btn btn-info Buttondefault"
            onClick={(e) => props.viewParticipants(modalEventInfo.id)}
          >
            Participantes
          </button>
          <button
            type="button"
            title="Confirmar presença"
            className="btn btn-info Buttondefault"
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
            className="btn btn-info Buttondefault"
            onClick={(e) => {
              props.edit(modalEventInfo.id);
              closeModal();
            }}
          >
            Atualizar
          </button>

          {modalEventInfo.extendedProps.status === 'PENDING' && (
          <button
            type="button"
            title="Confirmar agendamento no Calendário"
            className="btn btn-info Buttondefault"
            onClick={(e) => {
              props.confirmScheduling(modalEventInfo.id);
              closeModal();
            }}
          >
            Confirmar Agendamento
          </button>
        )}
        </Modal>
      )}

      {isNewAgendamentoModalOpen && (
        <Modal
          onClose={closeNewAgendamentoModal}
        >
          <h3>Cadastrar Novo Agendamento</h3>
          <p>Deseja cadastrar um novo agendamento para a data {selectedDateModal}?</p>
          <button
            type="button"
            className="btn btn-primary Buttondefault"
            onClick={confirmNewAgendamento}
          >
            Confirmar
          </button>
          <button
            type="button"
            className="btn btn-secondary Buttondefault"
            onClick={closeNewAgendamentoModal}
          >
            Cancelar
          </button>
        </Modal>
      )}
    </div>
  );
};

