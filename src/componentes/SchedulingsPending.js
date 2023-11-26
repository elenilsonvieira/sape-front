import React from "react";
import "./Button.css";
import GetName from "./GetPlaceOrSportName";
import GetNameUser from "./GetUserOrNameUser";

export default (props) => {
  const rows = props.schedulings?.map((scheduling) => {
    const styleButton = {
      padding: '5px 25px 7px 25px'
      
    };
    return (
      <tr key={scheduling.id}>
        <td>{scheduling.scheduledDate}</td>
        <td>{scheduling.scheduledStartTime}</td>
        <td>{scheduling.scheduledFinishTime}</td>
        <GetName id={scheduling.placeId} label="place" />
        <GetName id={scheduling.sportId} label="sport" />
        <td>{scheduling.status}</td>

        <GetNameUser registration={scheduling.creator} label="user" />

        <td>
          <button
            type="button"
            title="Confirmar Agendamento"
            className="btn btn-primary btn-confirmSc Buttondefault"
            onClick={(e) => props.approveScheduling(scheduling.id)}
          >
            Confirmar
          </button>
        </td>
        <td>
        <button
            type="button"
            title="Cancelar Agendamento"
            className="btn btn-danger btn-del"
            onClick={(e) => props.delete(scheduling.id)}
            style={styleButton}
          >
            Deletar
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
          <th scope="col" colSpan={2}>Confirmar Agendamento?</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
