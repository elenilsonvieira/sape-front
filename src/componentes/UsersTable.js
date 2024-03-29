import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const rows = props.user?.map((user) => {
    return (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.registration}</td>
        <td>
          <td>
            <button
              type="button"
              title="Excluir"
              className="btn btn-danger btndelres"
              onClick={(e) => props.delete(user.id)}
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
          <th scope="col">E-mail</th>
          <th scope="col">Matrícula</th>
          <th scope="col">Ação</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
