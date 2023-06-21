import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const rows = props.sports.map((sport) => {
    return (
      <tr key={sport.id}>
        <td>{sport.name}</td>
        <td></td>
        <td>
          <td className="btn-sport">
            <button
              className="btn btn-info"
              type="button"
              title="Favoritar"
              onClick={(e) => props.addSportsFavorite(sport.id)}
            >
              Favoritar
            </button>
            <button
              type="button"
              title="Exclude"
              className="btn btn-danger"
              onClick={(e) => props.delete(sport.id)}
            >
              Excluir
            </button>
          </td>
        </td>
      </tr>
    );
  });

  return (
    <table className="table table-hover">
      <thead>
        <tr className="table-primary">
          <th scope="col">Nome</th>
          <th></th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
