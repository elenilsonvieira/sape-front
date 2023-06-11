import React from "react";
import "./ViewScheduling.css";
import 'bootswatch/dist/minty/bootstrap.css';
import { withRouter } from 'react-router-dom';
import SchedulingTable from "../../../componentes/SchedulingTable";
import SchedulingApiService from "../../../services/SchdulingApiService";
import FormGroup from "../../../componentes/FormGroup";
import DDPlaces from "../../../componentes/DropDown/DDPlaces";
import DDSports from "../../../componentes/DropDown/DDSport";
import { showSuccessMessage, showErrorMessage } from '../../../componentes/Toastr';
import axios from "axios";

class ViewScheduling extends React.Component {
    state = {
        
        scheduling:[],
        creator:"",
        selectedPlace:"",
        selectedSport:"",
        date:""
    }

   
 
    constructor() {
        super();
        this.service = new SchedulingApiService();
    }

    find = () => {
        this.service.find('')
        .then( Response => {
            const scheduling = Response.data;
            console.log("🚀 ~ file: ViewScheduling.js:32 ~ ViewScheduling ~ scheduling:", scheduling)
            this.setState({scheduling: scheduling});
            
        }).catch( error => {
            console.log(error.Response)
        });
    }
    findAllParticpants = (schedulingId) => {
        this.service.findAllParticpants(schedulingId)
        .then( Response => {
            const users = Response.data;
            console.log("🚀 ~ file: ViewScheduling.js:32 ~ ViewScheduling ~ scheduling:", users)
            this.setState({users: users});
            
        }).catch( error => {
            console.log(error.Response)
        });
    }

    delete = (schedulingId) => {
        this.service.delete(schedulingId)
        .then( Response => {
            showSuccessMessage("Agendamento excluído com sucesso!")
            this.find();
        }).catch( error => {
            showErrorMessage(error.response.data);
            console.log(error.Response)
        });
    }

    viewParticipants = (schedulingId) => {	
        this.props.history.push(`/viewParticipants/${schedulingId}`);
    }
    viewSchedulingPending = () => {	
        this.props.history.push(`/viewSchedulingPending`);
    }

    create = () => {
        this.props.history.push("/createScheduling");
    }

    perfil = (userId) => {
        this.props.history.push(`/viewUser/${userId}`);
    }

    componentDidMount() {
        this.find();
    }

    getUserRegistration = () =>{
        const user = JSON.parse(localStorage.getItem('loggedUser'));
        return user.registration;
    }
    getUserEmail = () =>{
        const user = JSON.parse(localStorage.getItem('loggedUser'));
        return user.email;
    }

    handleInputChangePlace = (place) => {
        console.log("place:", place);
        this.setState({ selectedPlace: place }, () => {
          console.log('place selected', this.state.selectedPlace);
        });
      }


    handleInputChangeSport = (sport) => {
        console.log("place:", sport);
        this.setState({ selectedSport: sport }, () => {
          console.log('place selected', this.state.selectedSport);
        })
    }

    filterSearch = () => {
        let aplyFilters = "?";

        const filters = [["date=", this.state.date], ["placeId=", this.state.selectedPlace], ["sportId=", this.state.selectedSport]];
        for(let fil of filters) {
            if(fil[1] !== "") {
                aplyFilters += `${fil[0]}${fil[1]}&`;
            }
        }

        this.service.findWithFilter(aplyFilters)
        .then( Response => {
            const scheduling = Response.data;
            this.setState({scheduling: scheduling});
        }).catch( error => {
            console.log(error.Response)
        });
    }

    addParticipant = (schedulingId) => {
        console.log("id1= "+schedulingId)
       // this.service.addParticipant(schedulingId)
      axios.patch(`http://localhost:8080/api/scheduling/${schedulingId}/addParticipant`, { matricula: this.getUserRegistration() })
        .then( Response => {  
            showSuccessMessage("Você demonstrou interesse em participar da prática!");
            console.log(Response);
        }).catch( error => {
            showErrorMessage(error.response);
            console.log(error.Response);
        });
    }
    
    removeParticipant = (schedulingId) => {
        this.service.removeParticipant(schedulingId)
        .then( Response => {
            showSuccessMessage("Interesse em participar da prática retirado!");
            console.log(Response);
        }).catch( error => {
            showErrorMessage(error.response.data);
            console.log(error.Response);
        });
    }
    
    addIsPresent =  (schedulingId) => {
       console.log("🚀 ~ file: ViewScheduling.js:138 ~ ViewScheduling ~ schedulingId:", schedulingId)
       this.service.addIsPresent(schedulingId,this.getUserRegistration())
        .then( Response => {  
            showSuccessMessage("Presença confirmada nessa prática!");          
            console.log(Response);
        }).catch( error => {
            showErrorMessage(error.response);
            console.log(error.response);
        });
    }

   
    render(){
        return(
            <div>
                <header className="App-header">
                    <fieldset>
                        <h1 className="title">Agendamentos</h1>
                        <div className="card mb-3 cardScheduling">
                            <h3 className="card-header">Filtrar
                                <div className="card-body">
                                    <h5 className="card-title">Selecione filtros a serem aplicados</h5>
                                    <FormGroup label='Selecionar' htmlFor='lab' className="filterOptions">
                                        <DDPlaces   onChange={this.handleInputChangePlace} />
                                    </FormGroup>
                                    <FormGroup label='Selecionar' htmlFor='lab' className="filterOptions">
                                        <DDSports id="lab" onChange={this.handleInputChangeSport} />
                                    </FormGroup>
                                    <FormGroup label='Data' htmlFor='lab' className="filterOptions">
                                        <input className="form-sched" type="date" id="lab"
                                        onChange={(e) => {this.setState({date: e.target.value})}}/>
                                    </FormGroup>
                                    
                                    <br/>
                                    <br/>
                                    <button onClick={this.filterSearch} type="button" className="btn btn-success buttonFilter">Aplicar Filtro</button>
                                    <button onClick={this.find} type="button" className="buttonFilter btn btn-info">Mostrar Todos</button>
                                    <button onClick={this.create} type="button" className="btn btn-primary btnSc">Cadastrar novo agendamento</button>
                                     <button onClick={this.viewSchedulingPending} type="button" className="btn btn-danger btnScPen" title="Aguardando aprovação">Agendamentos pendentes</button>

                               </div>
                            </h3>
                        </div>
                        <br/>
                        <br/>
                        <fieldset className="field-viewsched">
                        <div className="table-schedfilter">
                                 <SchedulingTable schedulings={this.state.scheduling} viewParticipants={this.viewParticipants} delete={this.delete} addIsPresent={this.addIsPresent} addParticipant={this.addParticipant} removeParticipant={this.removeParticipant} perfil={this.perfil}/>
                    	</div>

                        </fieldset>
                       
                    </fieldset>
                    <br/>
                </header>
                <footer className="footer-sche"></footer>
            </div>
        )
    }
}

export default withRouter(ViewScheduling);
