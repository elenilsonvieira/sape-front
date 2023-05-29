import React from 'react';

import GetName from './GetPlaceOrSportName';
import GetNameUser from './GetUserOrNameUser';


// eslint-disable-next-line import/no-anonymous-default-export
export default props => {



    const rows = props.schedulings?.map( scheduling => {
        
        return (

            <tr key={scheduling.id} >
            <td>{scheduling.scheduledDate}</td>
            <td>{scheduling.scheduledStartTime}</td>
            <td>{scheduling.scheduledFinishTime}</td>
            <GetName id={scheduling.placeId} label="place"/>
            <GetName id={scheduling.sportId} label="sport"/>
            <td>{scheduling.status }</td>
            
            <GetNameUser registration = {scheduling.creator} label="user"/>

            
           

            <td>
                <button type="button" title="Cancelar Presença" className="btn btn-primary"
                         onClick={e => props.approveScheduling(scheduling.id)}
                        >
                            Confirmar
                </button>
            </td> 
            
             
            
            
           
        </tr>
    )
});

return(
    <table className="table table-hover">
        <thead>
            <tr >
                <th scope="col">Data</th>
                <th scope="col">Início</th>
                <th scope="col">Fim</th>
                <th scope="col">Local</th>
                <th scope="col">Esporte</th>
                <th scope="col">Status</th>
                <th scope="col">Agendado por:</th>
                
                
                <th scope="col">Confirmar Agendamento?</th>
                
                
            </tr>
        </thead>
        <tbody >
            {rows}
        </tbody>
    </table>
)
}