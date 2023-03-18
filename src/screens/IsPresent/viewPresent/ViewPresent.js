import React from "react";
import { withRouter } from 'react-router-dom';

import UserApiService from "../../../services/UserApiService";

import UsersPresent from "../../../componentes/UsersPresent";

import { showErrorMessage } from '../../../componentes/Toastr';

class ViewPresent extends React.Component {
    state = {
        name:'',
        users:[]
    }
    
    constructor() {
        super();
        this.service = new UserApiService();
    }
    
    componentDidMount() {
        this.find();
    }
    delete = (userId) => {
        this.service.delete(userId)
        .then( Response => {
            this.find();
        }).catch( error => {
            showErrorMessage("Ocorreu um erro ao excluir, tente novamente!");
            console.log(error.Response)
        });
    }

    find = () => {
        this.service.find('') // pega todos
        .then( Response => {
            const users = Response.data;
            this.setState({users});
            console.log(users);
        }).catch( error => {
            console.log(error.response)
        });
    }

    create = () => {
        this.props.history.push("/createScheduling");
    }

    render(){
        return(
            <div>
                <header className="App-header">
                    <fieldset>
                        <h1 className="title">Participação Confirmada</h1>
                        <br/>
                        <br/>
                        <br/>
                        <UsersPresent users={this.state.users} delete={this.delete}/>
                    </fieldset>
                    <br/>
                    <button onClick={this.create} type="button" className="btn btn-primary">Cadastrar novo agendamento</button>
                </header>
            </div>
        )
    }
}

export default withRouter(ViewPresent);
