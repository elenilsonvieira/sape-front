import React from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = props.users.map( user => {
        return (
            <tr key={user.id}>
                <td>{user.name}</td>
            </tr>
        )
    } )

    return (

        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}