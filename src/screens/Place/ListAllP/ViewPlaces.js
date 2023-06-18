import React from "react";
import "./ViewPlaces.css";
import { withRouter } from 'react-router-dom';
import PlacesTable from "../../../componentes/PlacesTable";
import PlaceApiService from "../../../services/PlaceApiService";

import { showErrorMessage } from '../../../componentes/Toastr';

class ViewPlaces extends React.Component {
    state = {
        places:[]
    }
    
    constructor() {
        super();
        this.service = new PlaceApiService();
    }
    
    componentDidMount() {
        this.find();
    }

    find = () => {
        this.service.find('') // pega todos
        .then( Response => {
            const places = Response.data;
            this.setState({places});
            console.log(places);
        }).catch( error => {
            console.log(error.response)
        });
    }

    viewResponsibles = (placeId) => {
        this.props.history.push(`/viewResponsibles/${placeId}`);
    }

    delete = (placeId) => {
        this.service.delete(placeId)
        .then( Response => {
            this.find();
        }).catch( error => {
            showErrorMessage(error.response.data);
            console.log(error.Response);
        });
    }

    edit = (placeId) => {
        this.props.history.push(`/updatePlace/${placeId}`);
    }

    create = () => {
        this.props.history.push("/createPlace");
    }

    render(){
        return(
            <div>
                <header className="App-header"> 
                <h1 className="title">Locais</h1>
                    <fieldset className="field-viewplace">
                       
                        <br/>
                        <br/>
                        <br/>
                        <div className="table-all">
                            <PlacesTable places={this.state.places} viewResponsibles={this.viewResponsibles} delete={this.delete} edit={this.edit} />
                        </div>
                        
                        
                    </fieldset>
                    <br/>
                    <button onClick={this.create} type="button" className="btn-viewplace btn btn-primary">Cadastrar novo local</button>
                </header>
                <footer className="footer-viewplace"></footer>
            </div>
        )
    }
}

export default withRouter(ViewPlaces);
