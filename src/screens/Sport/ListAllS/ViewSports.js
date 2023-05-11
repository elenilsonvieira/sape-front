import React from "react";
import "./ViewSports.css";
import 'bootswatch/dist/minty/bootstrap.css';
import { withRouter } from 'react-router-dom';
import SportsTable from "../../../componentes/SportsTable";
import SportApiService from "../../../services/SportApiService";
import UserApiService from "../../../services/UserApiService";
import { showSuccessMessage, showErrorMessage, confirmarExclusaoEsporte } from '../../../componentes/Toastr';

class ViewSports extends React.Component {
    state = {
        sports:[],
    }

    constructor() {
        super();
        this.service = new SportApiService();
        this.userService = new UserApiService();
    }
    
    componentDidMount() {
        this.find();
    }

    getLoggedUser = () =>{
        var value = localStorage.getItem('loggedUser');
        var user = JSON.parse(value);

        if (user == null) {

            user = " ";
        }

        return user;
}

    find = () => {
        this.service.find('')
        .then( Response => {
            const sports = Response.data;
            this.setState({sports});
            console.log(sports);
        }).catch( error => {
            console.log(error.Response)
        });
    }

    

    delete = (sportId) => {
       
        this.service.delete(sportId)
        .then( Response => {
            this.find();
        }).catch( error => {
            showErrorMessage("Ocorreu um erro ao excluir o esporte, tente novamente!");
            console.log(error.Response)
        });
    }

    edit = (sportId) => {
        this.props.history.push(`/updateSport/${sportId}`);
    }

    create = () => {
        this.props.history.push("/createSport");
    }

    
    addSportsFavorite = (sportId) => {
        
        this.userService.addSportsFavorite(this.getLoggedUser().id,sportId)

        .then( Response => {  

            showSuccessMessage("Você demonstrou interesse nesse esporte!");

        }).catch( error => {

            showErrorMessage(error.response.data);

        });
    }

    render(){
        return(
            <div>
                <header className="App-header">
                    <fieldset>
                    <h1 className="title">Esportes</h1>
                        <br/>
                        <br/>
                        <br/>
                        <SportsTable sports={this.state.sports} delete={this.delete} edit={this.edit} addSportsFavorite={this.addSportsFavorite}/>
                    </fieldset>
                    <br/>
                    <button onClick={this.create} type="button" className="btn btn-primary">Novo Esporte</button>
                </header>
            </div>
        )
    }
}

export default withRouter(ViewSports);
