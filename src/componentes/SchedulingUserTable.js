import React from "react";
import { BsEyeFill } from "react-icons/bs";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const rows = props.schedulings?.map((scheduling) => {
    return (
        <tr key={scheduling.id}>
        <td>{scheduling.scheduledDate}</td>
        <td>{scheduling.scheduledStartTime}</td>
        <td>{scheduling.scheduledFinishTime}</td>
        <td className="columnOverflow">{scheduling.location} </td>
        <td className="columnOverflow">{scheduling.title} </td>
        <td className="columnOverflow">{scheduling.creator}</td>

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
            title="Cancelar Presença"
            className="btn btn-danger btn-cancelSc"
            onClick={(e) => props.removeIsPresent(scheduling.id)}
          >
            Cancelar Presença
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
          <th scope="col">Agendado por</th>
          <th scope="col">Participantes</th>
          <th scope="col">Presença Confirmada</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
