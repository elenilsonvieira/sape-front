import React from "react";
import axios from "axios";

const DDUsers = (props) => {

    const [users, setUsers] = React.useState([]); //array vazio aqui no final para prevenir erro de undefined tentando ser mapeado.

    function findUsers() {
        axios.get( "http://localhost:8080/api/user"
        ).then( Response => {
            const users = Response.data;
            setUsers(users);
            console.log("users", users);
        }).catch(error => {
            console.log(error.Response)
        });
    }

    React.useEffect(() => { //componentDidMount das funções.
        findUsers();
    },[]);

    return (
        <select  id={props.id} onChange={props.onChange}>
            <option className="form-control" value="">Perfil</option>
            {users.map( user => {
                const {id, name, username,sportsFavorite} = user; //destructure ou algo similar da minha entity do BD - recuperando o que desejo.
                if(props.returnEntity) { //se quisermos retornar a entidade
                    const stringOfObject = JSON.stringify(user); //como saída no schedulingApiService estava tento apenas [Object object]. Reesolvido com o processo de conversão em string e construção em objeto.
                    return (<option key={id} className="form-control" value={stringOfObject}>{name}{username}{sportsFavorite}</option>)
                }
                return (<option key={id} className="form-control" value={id}>{name}{username}{sportsFavorite}</option>)
            })}
        </select>
    )
}

export default DDUsers;