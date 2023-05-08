import React from "react";
import { withRouter } from 'react-router-dom';

import UserApiService from "../../../services/UserApiService";

import UsersPresent from "../../../componentes/UsersPresent";

import { showErrorMessage } from '../../../componentes/Toastr';
import SchedulingApiService from "../../../services/SchdulingApiService";
import axios from "axios";

class ViewPresent extends React.Component {
    state = {
        // name:'',
        // users:[],
        schedulingUser:[]
            
        
    }
   
    
    constructor() {
        super();
        this.service = new SchedulingApiService();
    }
    
    componentDidMount() {
        this.findSchedulingsUser();

    }

    getUserRegistration(){
        const user = JSON.parse(localStorage.getItem('loggedUser'));

        return user.registration;
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

    findSchedulingsUser = () => {
        this.service.confirmedByUser(this.getUserRegistration()) 
        .then( Response => {
            const schedulings = Response.data;
            this.state.schedulingUser = schedulings
            this.setState({schedulings})
            console.log(this.state.schedulingUser);
        }).catch( error => {
            console.log(error.response)
        });
    }


    //  find = () => {
    //      this.service.find('') // pega todos
    //      .then( Response => {
    //          const users = Response.data;
    //          this.setState({users});
    //          console.log(users);
    //      }).catch( error => {
    //          console.log(error.response)
    //      });
    //  }

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
                        <UsersPresent schedulings={this.state.schedulingUser} delete={this.delete}/>

                    </fieldset>
                    <br/>
                    {/* <button onClick={this.create} type="button" className="btn btn-primary">Cadastrar novo agendamento</button> */}
                </header>
            </div>
        )
    }
}

export default withRouter(ViewPresent);
