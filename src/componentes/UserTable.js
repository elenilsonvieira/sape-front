import React from 'react';


// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = props.users.map(user => {
        return (
            <tr key={user.id}>
                {/* <td>{user.id}</td> */}
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user['roles']['0']['name']}</td>
                <td>{user['sportesFavorate']['0']['name']}</td>
                <td className="col-md-2">
                    <button type="button" title="Editar"
                        className="btn btn-warning"
                        onClick={e => props.edit(user.id)}>
                        <i className="pi pi-pencil"></i>
                    </button>
                </td>
            </tr>
        )
    } )

    return (

        <table className="table table-hover">
            <thead>
                <tr className="table-active">
                    {/* <th scope="col">Id</th> */}
                    <th scope="col">Nome</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Matrícula</th>
                    <th scope="col">Papel</th>
                    <th scope="col">Esportes Favoritos</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}