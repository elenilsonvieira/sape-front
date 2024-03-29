import React from "react";
import "../../Place/UpdateP/UpdatePlace.css";
import "bootswatch/dist/minty/bootstrap.css";
import "./UpdateUser.css";
import FormGroup from "../../../componentes/FormGroup";
import UserApiService from "../../../services/UserApiService";

import {
  showSuccessMessage,
  showErrorMessage,
} from "../../../componentes/Toastr";

export default class UpdateUser extends React.Component {
  state = {
    id: 0,
    name: "",
    email: "",
    registration: "",
    roles: "",
    sportsFavorite: "",
  };

  constructor() {
    super();
    this.service = new UserApiService();
  }

  findById = (userId) => {
    this.service
      .find(userId)
      .then((response) => {
        const user = response.data;
        const id = user.id;
        const name = user.name;
        const email = user.email;
        const registration = user.registration;
        const sportsFavorite = user.sportsFavorite;
        const roles = user.roles;

        this.setState({ id, name, email, registration, roles, sportsFavorite });
        console.log(
          "🚀 ~ file: UpdateUser.js:17 ~ UpdateUser ~ registration:",
          registration
        );
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

    if (!this.state.email) {
      errors.push("Campo Email é obrigatório!");
    } else if (!this.state.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.push("Informe um email válido!");
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
        name: this.state.name,
        email: this.state.email,
        registration: this.state.registration,
        roles: this.state.roles,
        sportsFavorite: this.state.sportsFavorite,
      })
      .then((response) => {
        showSuccessMessage("Usuario atualizado com sucesso!");
        console.log(response);
        this.props.history.push("/viewUser");
      })
      .catch((error) => {
        showErrorMessage(error.response.data);
        console.log(error.response);
      });
  };

  cancel = () => {
    this.props.history.push("/viewUser");
  };

  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="title">Atualizar Dados</h1>
          <fieldset className="fieldset-updateUser">
            <div className="container-updateuser">
              <FormGroup label="Nome" htmlFor="upd">
                <input
                  className="form-control"
                  type="text"
                  id="upd"
                  value={this.state.name || ""}
                  disabled={true}
                  onChange={(e) => {
                    this.setState({ name: e.target.value });
                  }}
                />
                <span className="span-inputs">
                  O nome não pode ser alterado
                </span>
              </FormGroup>

              <FormGroup label="Email" htmlFor="email">
                <input
                  className="form-control"
                  type="text"
                  id="email"
                  value={this.state.email || ""}
                  onChange={(e) => {
                    this.setState({ email: e.target.value });
                  }}
                />
              </FormGroup>

              <FormGroup label="Matricula" htmlFor="regist">
                <input
                  className="form-control"
                  type="text"
                  id="regist"
                  value={this.state.registration || ""}
                  disabled={true}
                  onChange={{ registration: this.state.registration }}
                />
                <span className="span-inputs">
                  A matricula não pode ser alterado
                </span>
              </FormGroup>

              <br />
              <br />
              <button
                id="btn-upd"
                onClick={this.put}
                type="button"
                className="btn btn-primary Buttondefault"
              >
                Atualizar
              </button>
              <button
                id="btn-del"
                onClick={this.cancel}
                type="button"
                className="btn btn-danger"
              >
                Cancelar
              </button>
            </div>
          </fieldset>
        </header>
        <footer className="footer-updateUser"></footer>
      </div>
    );
  }
}
