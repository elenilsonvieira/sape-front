import React from "react";
import "./ViewSportsFavorate.css";
import "bootswatch/dist/minty/bootstrap.css";
import { withRouter } from "react-router-dom";
import SportsFavoriteTable from "../../../componentes/SportsFavoriteTable";
import SportsFavoriteApiService from "../../../services/SportsFavoriteApiService";
import { showErrorMessage } from "../../../componentes/Toastr";
import UserApiService from "../../../services/UserApiService";

class ViewSportsFavorite extends React.Component {
  state = {
    sportsfavorite: [],
  };

  constructor() {
    super();
    this.service = new SportsFavoriteApiService();
    this.userService = new UserApiService();
  }

  getLoggedUser = () => {
    var value = localStorage.getItem("loggedUser");
    var user = JSON.parse(value);

    if (user == null) {
      user = " ";
    }

    return user;
  };

  componentDidMount() {
    this.find();
  }

  find = () => {
    this.service
      .find("")
      .then((Response) => {
        const sportsFavorate = Response.data;
        this.setState({ sportsFavorate });
      })
      .catch((error) => {
        console.log(error.Response);
      });
  };

  delete = (sportsFavoritetId) => {
    this.userService
      .delete(sportsFavoritetId)
      .then((Response) => {
        this.find();
      })
      .catch((error) => {
        showErrorMessage(
          "Ocorreu um erro ao excluir o esporte, tente novamente!"
        );
        console.log(error.Response);
      });
  };

  render() {
    return (
      <div>
        <header className="App-header">
          <fieldset>
            <h1 className="title">Esportes favoritos</h1>
            <br />
            <br />
            <br />
            <SportsFavoriteTable
              sportsFavorite={this.state.sportsfavorite}
              delete={this.removeSportsFavorite}
            />
          </fieldset>
        </header>
      </div>
    );
  }
}

export default withRouter(ViewSportsFavorite);
