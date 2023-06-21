import React from "react";
import "./Login.css";
import FormGroup from "../../componentes/FormGroup";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../../main/SessionProvider";
import { showErrorMessage, showSuccessMessage } from "../../componentes/Toastr";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
  };

  madeLogin = () => {
    this.context
      .login(this.state.username, this.state.password)
      .then((user) => {
        if (user) {
          showSuccessMessage("Bem vindo(a)" + this.state.username);
          this.props.history.push("/createScheduling");
        } else {
          showErrorMessage("Login Inválido!");
        }
      })
      .catch((error) => {
        console.log("🚀 ~ file: Login.js:26 ~ Login ~ error:", error)
        showErrorMessage(
          "Ocorreu um erro! Autenticação sendo Processada:",
          error
          
        );
      });
  };
  render() {
    return (
      <div className="cont">
        <header>
          <fieldset className="set02">
            <h3>Sistema de Agendamentos de Práticas Esportivas</h3>
            <h1 id="h1">SAPE</h1>
            <h2>
              Para entrar no sistema faça o login com a matrícula e a senha do
              Suap.{" "}
            </h2>
            <FormGroup label htmlFor="lab1">
              <label id="lab1">Matrícula</label>
              <input
                id="input1"
                className="form-control"
                type="text"
                onChange={(e) => {
                  this.setState({ username: e.target.value });
                }}
              />
            </FormGroup>
            <FormGroup label htmlFor="lab2">
              <label id="lab2">Senha</label>
              <input
                id="input2"
                type="password"
                onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}
              />
            </FormGroup>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.madeLogin}
            >
              Login
            </button>
          </fieldset>
        </header>
      </div>
    );
  }
}
Login.contextType = AuthContext;
export default withRouter(Login);
