import React from "react";
import "./UpdatePlace.css";
import "bootswatch/dist/minty/bootstrap.css";
import FormGroup from "../../../componentes/FormGroup";
import PlaceApiService from "../../../services/PlaceApiService";

import {
  showSuccessMessage,
  showErrorMessage,
} from "../../../componentes/Toastr";

export default class UpdatePlace extends React.Component {
  state = {
    id: 0,
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

  findById = (placeId) => {
    this.service
      .find(placeId)
      .then((response) => {
        const place = response.data;
        const id = place.id;
        const placeName = place.name;
        const placeReference = place.reference;
        const capacityMax = place.maximumCapacityParticipants;
        const isPublic = place.public;
        const responsibles = place.responsibles;

        this.setState({
          id,
          placeName,
          placeReference,
          capacityMax,
          isPublic,
          responsibles,
        });
        console.log(this.state.capacityMax);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  componentDidMount() {
    const params = this.props.match.params;
    const id = params.id;
    this.findById(id);
  }

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

    return errors;
  };

  put = () => {
    const errors = this.validate();

    if (errors.length > 0) {
      errors.forEach((message, index) => {
        showErrorMessage(message);
      });
      return false;
    }

    this.service
      .update(this.state.id, {
        name: this.state.placeName,
        reference: this.state.placeReference,
        maximumCapacityParticipants: this.state.capacityMax,
        public: this.state.isPublic,
        responsibles: this.state.responsibles,
      })
      .then((response) => {
        showSuccessMessage("Local atualizado com sucesso!");
        console.log(response);
        this.props.history.push("/listPlaces");
      })
      .catch((error) => {
        showErrorMessage(error.response.data);
        console.log(error.response);
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

  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="title">Atualizar local</h1>
          <fieldset className="field-upPlace">
            <FormGroup label="Nome" htmlFor="lab">
              <input
                className="form-control"
                type="text"
                id="lab"
                value={this.state.placeName}
                onChange={(e) => {
                  this.setState({ placeName: e.target.value });
                }}
              />
            </FormGroup>
            <FormGroup label="Referência" htmlFor="lab">
              <input
                className="form-control"
                type="text"
                id="lab"
                value={this.state.placeReference}
                autoComplete="off"
                onChange={(e) => {
                  this.setState({ placeReference: e.target.value });
                }}
              />
            </FormGroup>

            <FormGroup
              className="capacity-upd"
              label="Capacidade total de pessoas"
              htmlFor="lab03"
            >
              <input
                className="form-control-small"
                type="number"
                id="lab"
                min={1}
                max={250}
                autoComplete="off"
                value={this.state.capacityMax}
                onChange={(e) => {
                  this.setState({ capacityMax: e.target.value });
                }}
              />
            </FormGroup>

            <FormGroup
              className="isPublic-upd"
              label="É público?"
              htmlFor="lab"
            >
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                checked={this.state.isPublic}
                onChange={this.handleChange}
              />
            </FormGroup>
            <br />
            <br />
            <button
              onClick={this.put}
              type="button"
              className="btn btn-primary btn-upPlace"
            >
              Atualizar
            </button>
            <button
              onClick={this.cancel}
              type="button"
              className="btn btn-danger btn-upPlace"
            >
              Cancelar
            </button>
          </fieldset>
        </header>
        <footer className="footer-upPlace"></footer>
      </div>
    );
  }
}
