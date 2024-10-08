import React from "react";
import { useParams, withRouter } from "react-router-dom";
import UsersPresent from "../../../componentes/UsersPresent";
import "./ViewParticipants.css";
import { showErrorMessage } from "../../../componentes/Toastr";
import SchedulingApiService from "../../../services/SchedulingApiService";

class ViewParticipants extends React.Component {
  state = {
    name: "",
    users: [],
    schedulingUser: [],
  };

  constructor() {
    super();
    this.service = new SchedulingApiService();
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.find(id);
  }

  delete = (userId) => {
    this.service
      .delete(userId)
      .then((Response) => {
        this.find();
      })
      .catch((error) => {
        showErrorMessage("Ocorreu um erro ao excluir, tente novamente!");
        console.log(error.Response);
      });
  };

  find = (schedulingId) => {
    console.log(
      "🚀 ~ file: ViewParticipants.js:43 ~ ViewParticipants ~ schedulingId:",
      schedulingId
    );
    this.service
      .findAllParticpants(schedulingId) // pega todos
      .then((Response) => {
        const users = Response.data;

        this.setState({ users });
        console.log(
          "🚀 ~ file: ViewParticipants.js:60 ~ ViewParticipants ~ users:",
          users
        );
        this.state.users = users;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  create = () => {
    this.props.history.push("/createScheduling");
  };

  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="title">Participação Confirmada</h1>
          <fieldset className="field-usersched">
            <br />
            <br />
            <br />
            <div className="table-all">
              <UsersPresent users={this.state.users} delete={this.delete} />
            </div>
          </fieldset>
          <br />
        </header>
        <footer className="footer-usersched"></footer>
      </div>
    );
  }
}

export default withRouter(ViewParticipants);
