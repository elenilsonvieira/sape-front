import React from "react";
import "./PlacesTable.css";
import "./Button.css";
import { BsEyeFill } from "react-icons/bs";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const rows = props.places.map((place) => {
    return (
      <tr key={place.id}>
        <td className="columnOverflow">{place.name}</td>
        <td className="columnOverflow">{place.reference}</td>
        <td>{place.maximumCapacityParticipants}</td>
        <td>
          <BsEyeFill
            className="visu-participant"
            size={20}
            title="ver Responsáveis"
            onClick={(e) => props.viewResponsibles(place.id)}
          />
        </td>
        <td>{place.public ? "Sim" : "Não"}</td>
        <td>
          <td className="btn-sport">
            <button
              type="button"
              title="Edit"
              className="btn btn-warning Buttondefault"
              onClick={(e) => props.edit(place.id)}
            >
              Atualizar
            </button>
            <button
              type="button"
              title="Exclude"
              className="btn btn-danger bnt-excluir"
              onClick={(e) => props.delete(place.id)}
            >
              Excluir
            </button>
          </td>
        </td>
      </tr>
    );
  });

  return (
    <table className="table table-hover ">
      <thead>
        <tr className="table-primary ">
          <th scope="col">Nome</th>
          <th scope="col">Referência</th>
          <th scope="col">Capacidade</th>
          <th scope="col">Responsaveis</th>
          <th scope="col">Público?</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
