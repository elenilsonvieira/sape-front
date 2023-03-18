import React from "react";
import { withRouter } from 'react-router-dom';
import UsersTable from "../../../componentes/UsersTable";
import UserApiService from "../../../services/UserApiService";

class ViewUsers extends React.Component {
    state = {
        name: '',
        email: '',
        users: []
    }

    constructor() {
        super();
        this.service = new UserApiService();
    }

    componentDidMount() {        
        this.find();
        
    }

    delete = (userId) => {
        //axios.delete(`http://localhost:8080/api/user/${userId}`,
        this.service.delete(userId)
            .then(response => {
                this.find();
            }
            ).catch(error => {
                console.log(error.response);
            }
            );
    }

    create = () => {
        this.props.history.push("/createScheduling");
    }

    find = () => {
        var params = '?';


        if (this.state.name !== '') {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}name=${this.state.name}`;
        }

        if (this.state.email !== '') {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}email=${this.state.email}`;
        }

       


        //axios.get(`http://localhost:8080/api/user/${params}`)
        this.service.find(params)
            .then(response => {
                const users = response.data;
                this.setState({ users });
                console.log(users);
            }
            ).catch(error => {
                console.log(error.response);
            }
            );
    }

    findAll = () => {

        //axios.get(`http://localhost:8080/api/user/all`)
        this.service.findAll()
            .then(response => {
                const users = response.data;
                this.setState({ users });
                console.log(users);
            }
            ).catch(error => {
                console.log(error.response);
            }
            );
    }
    
    render(){
        return(
            <div>
                <header className="App-header">
                    <fieldset>
                    <h1 className="title">Perfil do Usuário</h1>
                        <br/>
                        <br/>
                        <UsersTable users={this.state.users} delete={this.delete} />
                    </fieldset>
                    <br/>
                    <br/>
                    <button onClick={this.create} type="button" className="btn btn-primary">Cadastrar novo agendamento</button>
                </header>
            </div>
        )
    }
}

export default withRouter(ViewUsers);