import React, { useState } from "react";
import { BsEyeFill } from "react-icons/bs";
import GetName from "./GetPlaceOrSportName";
import GetUserName from "./GetUserOrNameUser";
// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const rows = props.schedulings.map((scheduling) => {
    return (
      <tr key={scheduling.id}>
        <td>{scheduling.scheduledDate}</td>
        <td>{scheduling.scheduledStartTime}</td>
        <td>{scheduling.scheduledFinishTime}</td>
        <GetName id={scheduling.placeId} label="place" />
        <GetName id={scheduling.sportId} label="sport" />
        <td>{scheduling.status}</td>
        <GetUserName registration={scheduling.creator} label="user" />
        <td>
          <BsEyeFill
            className="visu-participant"
            size={20}
            title="ver participantes"
            onClick={(e) => props.viewParticipants(scheduling.id)}
          />
        </td>

        <td>
          <button
            type="button"
            title="Confirmar Presença"
            className="btn btn-success btn-confirm"
            onClick={(e) => props.addIsPresent(scheduling.id)}
          >
            Sim
          </button>
        </td>
        <td>
          <button
            type="button"
            title="Excluir"
            className="btn btn-danger btn-del"
            onClick={(e) => props.delete(scheduling.id)}
          >
            Excluir
          </button>
        </td>
      </tr>
    );
  });

  return (
    <table className="table table-hover">
      <thead>
        <tr className="table-primary">
          <th scope="col">Data</th>
          <th scope="col">Início</th>
          <th scope="col">Fim</th>
          <th scope="col">Local</th>
          <th scope="col">Esporte</th>
          <th scope="col">Status</th>
          <th scope="col">Agendado por:</th>
          <th>Participantes</th>
          <th scope="col">Presença Confirmada?</th>
          <th scope="col">ação:</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
