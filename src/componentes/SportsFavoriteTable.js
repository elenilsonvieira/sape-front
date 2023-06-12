import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = props.sportsFavorite?.map( sportsFavorite => {
       
       console.log(sportsFavorite)
        return (
            <tr key={sportsFavorite.id}>
                <td>{sportsFavorite.name}</td>
                <td>
                    <td>
                    <button className="btn btn-danger btn-desfavoritar" type="button" title="Desfavoritar"
                        onClick={e => props.delete(sportsFavorite.id)}>
                            Desfavoritar
                    </button>
                    </td>
            
                </td>
            </tr>
        )
    });

    return(
        <table className="table table-hover">
            
            <thead>
                
                <tr className="table-primary">
                    
                    
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