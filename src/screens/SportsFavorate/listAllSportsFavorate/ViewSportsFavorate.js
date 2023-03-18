import React from "react";
import "./ViewSportsFavorate.css";
import 'bootswatch/dist/minty/bootstrap.css';
import { withRouter } from 'react-router-dom';
import SportsFavoriteTable from "../../../componentes/SportsFavoriteTable";
import SportsFavoriteApiService from "../../../services/SportsFavoriteApiService";
import { showErrorMessage } from '../../../componentes/Toastr';

class ViewSportsFavorite extends React.Component {
    state = {
        sportsfavorite:[]
    }

    constructor() {
        super();
        this.service = new SportsFavoriteApiService();
    }
    
    componentDidMount() {
        this.find();
    }

    find = () => {
        this.service.find('')
        .then( Response => {
            const sportsFavorate = Response.data;
            this.setState({sportsFavorate});
        }).catch( error => {
            console.log(error.Response)
        });
    }

    delete = (sportsFavoritetId) => {
        this.service.delete(sportsFavoritetId)
        .then( Response => {
            this.find();
        }).catch( error => {
            showErrorMessage("Ocorreu um erro ao excluir o esporte, tente novamente!");
            console.log(error.Response)
        });
    }

    render(){
        return(
            <div>
                <header className="App-header">
                    <fieldset>
                    <h1 className="title">Esportes favoritos</h1>
                        <br/>
                        <br/>
                        <br/>
                        <SportsFavoriteTable sportsFavorite={this.state.sportsFavorite} delete={this.delete} />
                    </fieldset>
                </header>
            </div>
        )
    }
}

export default withRouter(ViewSportsFavorite);