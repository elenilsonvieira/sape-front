import React from "react";
import UsersTable from "../../../componentes/UsersTable";
import PlaceApiService from "../../../services/PlaceApiService";
import { withRouter } from 'react-router-dom';
import DDUsers from "../../../componentes/DropDown/DDUsers";
import { showErrorMessage, showSuccessMessage } from '../../../componentes/Toastr';
import "./ViewResponsibles.css";
import FormGroup from "../../../componentes/FormGroup";

class ViewResponsibles extends React.Component {
    state = {
        user: ''   
    }

    constructor() {
        super();
        this.service = new PlaceApiService();
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.find(id);
    }

    removeResponsibles = (userId) => {
        const placeId = this.props.match.params.id;
        this.service.removeResponsibles(placeId, userId)
        .then( Response => {
            this.find(placeId);
            showSuccessMessage("Responsável Removimo com Sucesso!")
        }).catch( error => {
            showErrorMessage("Ocorreu um erro ao remover, tente novamente!");
            console.log(error.Response)
        });
    }

    addResponsibles = () => {
        const placeId = this.props.match.params.id;
        this.service.addResponsibles(placeId, this.state.user.id)
        .then( Response => {
            this.find(placeId);
            showSuccessMessage("Responsável Adicionado com Sucesso!")
        }).catch( error => {
            showErrorMessage("Ocorreu um erro ao adicionar, tente novamente!");
            console.log(error.Response)
        });
    }

    handleInputChangeUser = (user) => {
        console.log("user:", user);
        this.setState({ user: user }, () => {
          console.log('user selected', this.state.user);
        });
      }

   
       find = (placeId) => {
         console.log("🚀 ~ file: ViewResponsibles.js:51 ~ ViewResponsibles ~ placeId:", placeId)
         this.service.getResponsibles(placeId) 
         .then( Response => {       
             console.log("🚀 ~ file: ViewResponsibles.js:54 ~ ViewResponsibles ~ Response:", Response.data)
          

                const responsibles = Response.data;
                
                this.setState({responsibles: responsibles});
                this.state.responsibles = responsibles;
                console.log("🚀 ~ file: ViewParticipants.js:60 ~ ViewParticipants ~ users:", responsibles)
        }).catch( error => {
            console.log("🚀 ~ file: ViewResponsibles.js:63 ~ ViewResponsibles ~ error:", error.data)
            console.log(error)
        });
    }


    render(){
        return(
            <div>
                <header className="App-header">
                      <h1 className="title">Responsáveis pelo Local</h1>
                    <fieldset className="field-viewResponsibles">
                      
                        <br/>
                        <br/>
                        <br/>
                        <div className="table-all" > 

                            <UsersTable user={this.state.responsibles}  delete={this.removeResponsibles}  />
                            
                        </div>
                        <div className="cont-resp">
             
                              <FormGroup className="filterUserResponsibles">
                                <DDUsers onChange={this.handleInputChangeUser}/>
                                <button  className="btn btn-primary btn-res" onClick={this.addResponsibles}>adicionar responsavel</button>
                            </FormGroup> 

                            
                            </div>
                       


                    </fieldset>
                    <br/>
                    
            </header>
            <footer className="footer-viewResponsibles"></footer>
            </div>
        )
    }
}

export default withRouter(ViewResponsibles);
