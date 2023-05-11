import React from "react";
import '../../Place/UpdateP/UpdatePlace.css'
import 'bootswatch/dist/minty/bootstrap.css';
import './UpdateUser.css';
import FormGroup from "../../../componentes/FormGroup";
import UserApiService from "../../../services/UserApiService";

import { showSuccessMessage, showErrorMessage } from '../../../componentes/Toastr';

export default class UpdateUser extends React.Component {
    state = {
        id: 0,
        name:"",
        email:"",
        registration:"",
        
    }
       
    
    constructor() {
        super();
        this.service = new UserApiService();
    }

    findById = (placeId) => {
        this.service.find(placeId)
        .then( response =>
            {
                const user = response.data;
                const id = user.id;
                const name = user.name;
                const email = user.email;
                const registration = user.registration;
                

                this.setState({id, name, email, registration}); 
                console.log("🚀 ~ file: UpdateUser.js:17 ~ UpdateUser ~ registration:", registration);
            }
        ).catch( error => {
            console.log(error.response);
        });
    }
    
    componentDidMount() {
        const params = this.props.match.params;
        const id = params.id;
        this.findById(id);
    }

    validate = () => {
        const errors = [];
        
    
        
        if(!this.state.email) {
            errors.push('É obrigatório informar um local de referência!');
        }
        
        

        return errors;

    }

    put = () => {
        const errors = this.validate();

        if(errors.length > 0){
            errors.forEach( (message, index) => {
                showErrorMessage(message);
            } );
            return false;
        }
        
        this.service.update(this.state.id,
            {
                name: this.state.name,
                email: this.state.email,
                registration: this.state.registration,
               
            }
        ).then(response => {
            showSuccessMessage("Usuario atualizado com sucesso!");
            console.log(response);
            this.props.history.push("/viewUser");
        }).catch(error => {
            showErrorMessage(error.response.data);
            console.log(error.response);
        });
    }

   

    cancel = () => {
        this.props.history.push("/viewUser");
    }

    render() {
        return (
            <div>
                <header className="App-header">
                    <fieldset>
                        <h1 className="title">Atualizar local</h1>
                       <div className="container-updateuser">
                        <FormGroup label='Name' htmlFor='lab'>
                            <input className="form-control" 
                            type="text" id="lab" 
                            value={this.state.name}
                            disabled={true}
                            onChange={(e) => {this.setState({name: e.target.value})}}/>
                        </FormGroup>
                        <FormGroup label='email' htmlFor='lab'>
                            <input className="form-control" type="text" id="lab" value={this.state.email}
                            onChange={(e) => {this.setState({email: e.target.value})}}/>
                        </FormGroup>
                        <FormGroup label='Matricula' htmlFor='regist'>
                            <input className="form-control" 
                            type="text" 
                            id="regist" 
                            value={this.state.registration}
                            disabled={true}
                            onChange={({registration: this.state.registration})}/>
                        </FormGroup>
                        <br/>
                        <br/>
                        <button id="btn-upd" onClick={this.put} type="button" className="btn btn-primary">Atualizar</button>
                        <button id="btn-del" onClick={this.cancel} type="button" className="btn btn-danger">Cancelar</button>
                    </div>
                    </fieldset>
                </header> 
                
            </div>
            
        )
    }
}