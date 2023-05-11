import React from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = props.users?.map( user => {
        return (
            <tr key={user.id}>
                <td>{user.name}</td> 
                <td>{user.registration}</td>
            </tr>
        )
    } )

    return (

        <table className="table table-hover">
            <thead>
                <tr className='table-primary'>
                    <th scope="col">Nome</th>
                    <th scope="col">Matrícula</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}