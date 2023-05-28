import React from "react";
import UsersTable from "../../../componentes/UsersTable";
import PlaceApiService from "../../../services/PlaceApiService";
import { withRouter } from 'react-router-dom';

import { showErrorMessage, showSuccessMessage } from '../../../componentes/Toastr';

class ViewResponsibles extends React.Component {
    state = {
        name:'',
        responsibles:[],
        schedulingUser:[]
            
        
    }

    
    constructor() {
        super();
        this.service = new PlaceApiService();
    }
    
     
     
     
    componentDidMount() {
        const id = this.props.match.params.id;
        this.find(id);
    }


    responsibles(responsibles){
        console.log("🚀 ~ file: ViewResponsibles.js:30 ~ ViewResponsibles ~ responsibles ~ responsibles:", responsibles)
        this.setState({responsibles: responsibles})
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

    addResponsibles = (userId) => {
        const placeId = this.props.match.params.id;
        this.service.addResponsibles(placeId, userId)
        .then( Response => {
            this.find(placeId);
            showSuccessMessage("Responsável Adicionado com Sucesso!")
        }).catch( error => {
            showErrorMessage("Ocorreu um erro ao adicionar, tente novamente!");
            console.log(error.Response)
        });
    }

   
       find = (placeId) => {
         console.log("🚀 ~ file: ViewResponsibles.js:51 ~ ViewResponsibles ~ placeId:", placeId)
         this.service.getResponsibles(placeId) // pega todos
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

    // create = () => {
    //     this.props.history.push("/createScheduling");
    // }

    render(){
        return(
            <div>
                <header className="App-header">
                    <fieldset className="fields">
                        <h1 className="title">Responsáveis pelo Local</h1>
                        <br/>
                        <br/>
                        <br/>
                        <div className="table-users"> 

                            <UsersTable user={this.state.responsibles}  delete={this.removeResponsibles}  />
                            
                        </div>


                    </fieldset>
                    <br/>
                    
            </header>
            </div>
        )
    }
}

export default withRouter(ViewResponsibles);
