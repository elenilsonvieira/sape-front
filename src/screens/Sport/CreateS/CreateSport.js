import React from "react";
import "./CreateSport.css";
import "bootswatch/dist/minty/bootstrap.css";
import FormGroup from "../../../componentes/FormGroup";
import SportApiService from "../../../services/SportApiService";

import {
  showSuccessMessage,
  showErrorMessage,
} from "../../../componentes/Toastr";

export default class CreateSport extends React.Component {
  state = {
    sportName: "",
  };

  constructor() {
    super();
    this.service = new SportApiService();
  }

  validate = () => {
    const errors = [];

    if (!this.state.sportName) {
      errors.push("É obrigatório informar o nome do esporte!");
    }

    return errors;
  };

  post = () => {
    const errors = this.validate();

    if (errors.length > 0) {
      errors.forEach((message, index) => {
        showErrorMessage(message);
      });
      return false;
    }

    this.service
      .create({
        name: this.state.sportName,
      })
      .then((Response) => {
        showSuccessMessage("Esporte criado com sucesso!");
        console.log(Response);
        this.props.history.push("/listSports");
      })
      .catch((error) => {
        showErrorMessage(error.response.data);
        console.log(error.Response);
      });
  };

  cancel = () => {
    this.props.history.push("/listSports");
  };

  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="title">Criar esporte</h1>
          <fieldset className="field-sport">
            <FormGroup label="Nome" htmlFor="lab" className="forms-sport">
              <input
                className="form-control"
                type="text"
                id="lab"
                placeholder="Digite o nome do esporte"
                onChange={(e) => {
                  this.setState({ sportName: e.target.value });
                }}
              />
            </FormGroup>
            <br />
            <br />
            <button
              type="button"
              className="btn btn-primary btnsSport Buttondefault bntsave"
              onClick={this.post}
            >
              Salvar
            </button>
            <button
              onClick={this.cancel}
              type="button "
              className="btn btn-danger btnsSport"
            >
              Cancelar
            </button>
          </fieldset>
        </header>
        <footer className="footer-sport"></footer>
      </div>
    );
  }
}
