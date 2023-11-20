import React from "react";
import "./CreatePlace.css";
import "bootswatch/dist/minty/bootstrap.css";
import FormGroup from "../../../componentes/FormGroup";
import PlaceApiService from "../../../services/PlaceApiService";

import {
  showSuccessMessage,
  showErrorMessage,
} from "../../../componentes/Toastr";
import DDUsers from "../../../componentes/DropDown/DDUsers";

export default class CreatePlace extends React.Component {
  state = {
    placeName: "",
    placeReference: "",
    capacityMax: "",
    isPublic: false,
    responsibles: [],
  };

  constructor() {
    super();
    this.service = new PlaceApiService();
  }

  handleInputChangeUser = (user) => {
    console.log("user:", user);
    this.setState({ responsible: user }, () => {
      console.log("user selected", this.state.responsibles.push(user));
    });
  };

  handleChange = () => {
    this.setState({
      isPublic: !this.state.isPublic,
    });
  };

  cancel = () => {
    this.props.history.push("/listPlaces");
  };

  validate = () => {
    const errors = [];

    if (!this.state.placeName) {
      errors.push("É obrigatório informar o nome do local!");
    }

    if (!this.state.placeReference) {
      errors.push("É obrigatório informar um local de referência!");
    }

    if (!this.state.capacityMax) {
      errors.push("É obrigatório informar a capacidade máxima do local!");
    }
    if (!this.state.responsibles || this.state.responsibles.length === 0) {
      errors.push("É obrigatório informar um responsável pelo local!");
    }
    if (this.state.capacityMax < 0) {
      errors.push("Capacidade Máxima deve ser um número positivo!");
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
        name: this.state.placeName,
        reference: this.state.placeReference,
        maximumCapacityParticipants: this.state.capacityMax,
        public: this.state.isPublic,
        responsibles: this.state.responsibles,
      })
      .then((response) => {
        showSuccessMessage("Local criado com Sucesso!");
        this.props.history.push("/listPlaces");
      })
      .catch((error) => {
        showErrorMessage(error.response.data);
        console.log(error.response);
      });
  };

  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="title">Criar local</h1>
          <fieldset className="field-place">
            <FormGroup label="Nome" htmlFor="lab01">
              <input
                className="form-control"
                type="text"
                id="lab"
                placeholder="Digite o nome do local"
                maxLength={25}
                onChange={(e) => {
                  this.setState({ placeName: e.target.value });
                }}
              />
            </FormGroup>
            <FormGroup label="Referência" htmlFor="lab02">
              <input
                className="form-control"
                type="text"
                id="lab"
                placeholder="Digite uma referência para o local"
                autoComplete="off"
                onChange={(e) => {
                  this.setState({ placeReference: e.target.value });
                }}
              />
            </FormGroup>
            <FormGroup
              label="Capacidade total de pessoas"
              htmlFor="lab03"
              className="capacity"
            >
              <input
                className="form-control-small"
                type="number"
                id="lab"
                autoComplete="off"
                placeholder="0"
                min={0}
                onChange={(e) => {
                  this.setState({ capacityMax: e.target.value });
                }}
              />
            </FormGroup>
            <FormGroup className="isPublic" label="É público?" htmlFor="lab">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                defaultChecked={this.state.isPublic}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup
              label="Nome do responsável pelo local"
              htmlFor="lab"
              className="filterUserPlace"
            >
              <DDUsers
                className="ddusers"
                onChange={this.handleInputChangeUser}
                label="Responsável"
              />
            </FormGroup>
            <br />
            <br />
            <button
              onClick={this.post}
              type="button"
              className="btn btn-primary btn-place Buttondefault"
            >
              Salvar
            </button>
            <button
              onClick={this.cancel}
              type="button"
              className="btn btn-danger btn-place"
            >
              Cancelar
            </button>
            <br />
          </fieldset>
        </header>
        <footer className="footer-place"></footer>
      </div>
    );
  }
}
