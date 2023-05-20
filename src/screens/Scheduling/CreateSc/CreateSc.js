import React from "react";
import './CreateSc.css'
import 'bootswatch/dist/minty/bootstrap.css';
import FormGroup from "../../../componentes/FormGroup";
import DDPlaces from "../../../componentes/DropDown/DDPlaces";
import DDSports from "../../../componentes/DropDown/DDSport"; 
import SchedulingApiService from "../../../services/SchdulingApiService";
import axios from "axios";

import { showSuccessMessage, showErrorMessage } from '../../../componentes/Toastr';

export default class CreateSc extends React.Component {
    
    state = {
        date:"",
        startTime:"",
        finishTime:"",
        selectedOptionPlace:"",
        selectedOptionSport:"",
        creator:"",
        
    }

    constructor() {
        super();
        this.service = new SchedulingApiService();
    }

    validate = () => {
        const errors = [];
        
        if(!this.state.date) {
            errors.push('É obrigatório informar a data em que acontecerá a prática esportiva!');
        }
        
        if(!this.state.startTime) {
            errors.push('É obrigatório informar o horário em que a prática esportiva começará!');
        }
        
        if (!this.state.finishTime){
            errors.push('É obrigatório informar o horário em que a prática esportiva terminará!');
        }

        if (!this.state.selectedOptionPlace){
            errors.push('É obrigatório selecionar um local!');
        }

        if (!this.state.selectedOptionSport){
            errors.push('É obrigatório selecionar um esporte!');
        }
        return errors;

    }

    post = () => {
        const errors = this.validate();

        if(errors.length > 0){
            errors.forEach( (message, index) => {
                showErrorMessage(message);
            } );
            return false;
        }

        const getUserRegistration = () => {
            const user = JSON.parse(localStorage.getItem("loggedUser"));

            return user.registration;
        }

        this.service.create(
            {
                scheduledDate: this.state.date,
                scheduledStartTime: this.state.startTime,
                scheduledFinishTime: this.state.finishTime,
                placeId: this.state.selectedOptionPlace,
                sportId: this.state.selectedOptionSport,
                creator: getUserRegistration() 
            }          
        ).then( Response => {

            showSuccessMessage("Prática agendada com sucesso!");
            console.log(Response);
            this.props.history.push("/listScheduling");

            this.sendEmail(this.state.selectedOptionSport);
        }).catch( error => {
            showErrorMessage(error.response.data);
            console.log(error.Response);
        });
    }
    sendEmail =(sportId)=>{
        axios.post(`http://localhost:8080/email/notify/favoritesportscheduling/${sportId}`
        
        ).then(Response => {
                    console.log("🚀 ~ file: ViewScheduling.js:178 ~ ViewScheduling ~ Response:", Response.data)
                   
                    
                }).catch(Error => {
                console.log("🚀 ~ file: ViewScheduling.js:178 ~ ViewScheduling ~ Error:", Error.data)
                
                })
                
        }


    cancel = () => {
        this.props.history.push("/listScheduling");
    }


    handleInputChangePlace = (e) => {
        console.log("place:", e);
        this.setState({ selectedOptionPlace: e }, () => {
          console.log('place selected', this.state.selectedOptionPlace);
        });
      }
    // handleInputChangePlace = (e) => {
    //     this.setState({selectedOptionPlace: e.target.value}, () => {
    //         console.log("Id do Local selecionado: ", this.state.selectedOptionPlace);
    //     });
    // }

    handleInputChangeSport = (e) => {
        this.setState({selectedOptionSport: e}, () => {
            console.log("Id do Esporte selecionado: ", this.state.selectedOptionSport);
        });
    }

    render() {
        return (
            <div>
                <header className="App-header">
                    <fieldset>
                        <h1 className="title">Agendar prática</h1>
                        <FormGroup label='Data' htmlFor='lab01' className="FieldSetSc">
                            <input className="form-control noMargin" type="date" id="lab"
                            onChange={(e) => {this.setState({date: e.target.value})}}/>
                        </FormGroup>
                        <FormGroup label='Hora de Início da prática' htmlFor='lab02' className="FieldSetSc">
                            <input className="form-control noMargin" type="time" id="lab"
                            onChange={(e) => {this.setState({startTime: e.target.value})}}/>
                        </FormGroup>
                        <FormGroup label='Hora de término da prática' htmlFor='lab03' className="FieldSetSc">
                            <input className="form-control noMargin" type="time" id="lab"
                            onChange={(e) => {this.setState({finishTime: e.target.value})}}/>
                        </FormGroup>
                        <br />
                        <br />
                        <FormGroup label='Selecione o local' htmlFor='lab04' className="FieldSetSc">
                            <DDPlaces id="lab" onChange={this.handleInputChangePlace} />
                        </FormGroup>
                        <FormGroup label='Selecione o esporte' htmlFor='lab05' className="FieldSetSc">
                            <DDSports id="lab" onChange={this.handleInputChangeSport} />
                        </FormGroup>
                        <br/>
                        <br/>
                        <br />
                        <button onClick={this.post} type="button" className="btn btn-primary">Salvar</button>
                        <button onClick={this.cancel} type="button" className="btn btn-danger">Cancelar</button>
                    </fieldset>
                </header>
            </div>
        )
    }
}