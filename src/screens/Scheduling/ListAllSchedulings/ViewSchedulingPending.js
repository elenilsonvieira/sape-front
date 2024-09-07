import React from "react";
import { withRouter } from "react-router-dom";
import SchedulingsPending from "../../../componentes/SchedulingsPending";
import {showErrorMessage, showSuccessMessage} from "../../../componentes/Toastr";
import SchedulingApiService from "../../../services/SchedulingApiService";

class viewSchedulingPending extends React.Component {
  state = {
    users: [],
    schedulingsPending: [],
  };

  constructor() {
    super();
    this.service = new SchedulingApiService();
  }

  componentDidMount() {
    this.find();
  }

  viewParticipants = (schedulingId) => {
    this.props.history.push(`/viewParticipants/${schedulingId}`);
  };
  viewSchedulingPending = () => {
    this.props.history.push(`/viewParticipants/`);
  };

  getUserRegistration() {
    const user = JSON.parse(localStorage.getItem("loggedUser"));

    return user.registration;
  }

  getLoggedUser = () => {
    var user = JSON.parse(localStorage.getItem("loggedUser"));

    if (user == null) {
      user = " ";
    }
    console.log(user);

    return user;
  };

  approveScheduling = (schedulingId) => {
    console.log(
      "🚀 ~ file: ViewSchedulingPending.js:57 ~ viewSchedulingPending ~ approveScheduling ~ schedulingId:",
      schedulingId
    );
    this.service
      .approveScheduling(schedulingId)
      .then((Response) => {
        showSuccessMessage("Agendamento Aprovado!");

        this.find();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  find = () => {
    this.service
      .findAllSchedulingPendingByPlaceResponsible(this.getUserRegistration()) // pega todos
      .then((Response) => {
        const schedulingsPending = Response.data;
        this.setState({ schedulingsPending });
        console.log(
          "🚀 ~ file: ViewParticipants.js:60 ~ ViewParticipants ~ users:",
          schedulingsPending
        );
        this.state.schedulingsPending = schedulingsPending;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  delete = (schedulingId) => {
    console.log(
      "🚀 ~ file: ViewSchedulingPending.js:57 ~ viewSchedulingPending ~ approveScheduling ~ schedulingId:",
      schedulingId
    );
    this.service
      .delete(schedulingId)
      .then((Response) => {
        showSuccessMessage("Agendamento Deletado!");

        this.find();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="title">Agendamentos Aguardando Confirmação</h1>
          <fieldset className="field-pendingsc">
            <br />
            <br />
            <br />
            <div className="table-sched">
              <SchedulingsPending
                schedulings={this.state.schedulingsPending}
                delete={this.delete}
                approveScheduling={this.approveScheduling}
              />
            </div>
          </fieldset>
          <br />
          {/* <button onClick={this.create} type="button" className="btn btn-primary">Cadastrar novo agendamento</button> */}
        </header>
        <footer className="footer-viewpendingsc"></footer>
      </div>
    );
  }
}

export default withRouter(viewSchedulingPending);
