import React from "react";
import { withRouter } from 'react-router-dom';

import SchedulingUserPresent from "../../../componentes/SchedulingUserTable";

import { showErrorMessage } from '../../../componentes/Toastr';
import SchedulingApiService from "../../../services/SchdulingApiService";


class ViewPresent extends React.Component {
    state = {
         users:[],
        schedulingUser:[]
            
        
    }
   
    
    constructor() {
        super();
        this.service = new SchedulingApiService();
    }
    
    componentDidMount() {
        
        this.findSchedulingsUser();

    }

    viewParticipants = (schedulingId) => {	
        this.props.history.push(`/viewParticipants/${schedulingId}`);
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


    find = (schedulingId) => {
        console.log("🚀 ~ file: ViewParticipants.js:43 ~ ViewParticipants ~ schedulingId:", schedulingId)
        this.service.findAllParticpants(schedulingId) // pega todos
        .then( Response => {
            const users = Response.data;
            
            this.setState({users});
            console.log("🚀 ~ file: ViewParticipants.js:60 ~ ViewParticipants ~ users:", users)
            this.state.users = users;
        }).catch( error => {
            console.log(error)
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
                        <SchedulingUserPresent schedulings={this.state.schedulingUser} viewParticipants={this.viewParticipants} delete={this.delete}/>

                    </fieldset>
                    <br/>
                    {/* <button onClick={this.create} type="button" className="btn btn-primary">Cadastrar novo agendamento</button> */}
                </header>
            </div>
        )
    }
}

export default withRouter(ViewPresent);
