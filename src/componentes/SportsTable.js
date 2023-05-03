import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = props.sports.map( sport => {
        return (
            <tr key={sport.id}>
                <td>{sport.name}</td>
                <td>
                    <td>
                    <button className="btn btn-danger" type="button" title="Favoritar"
                        onClick={e => props.addSportsFavorite(sport.id)}>
                            Favoritar
                    </button>
                    <button type="button" title="Exclude" className="btn btn-danger"
                        onClick={e => props.delete(sport.id)}>
                            Excluir
                    </button>
                    </td>
                
                </td>
            </tr>
        )
    });

    return(
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )

}