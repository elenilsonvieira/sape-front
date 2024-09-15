import React from "react";
import { withRouter } from "react-router-dom";
import SchedulingsPending from "../../../componentes/SchedulingsPending";
import {showErrorMessage, showSuccessMessage} from "../../../componentes/Toastr";
import SchedulingApiService from "../../../services/SchedulingApiService";
import UserApiService from "../../../services/UserApiService";

class viewSchedulingPending extends React.Component {
  state = {
    users: [],
    schedulingsPending: [],
  };

  constructor() {
    super();
    this.service = new SchedulingApiService();
    this.userService = new UserApiService();
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

  findUserCreatorName = async (registration) => {
    const response = await this.userService.findByRegistration(registration);
    return response.data.name;
  } 

  find = async () => {
    const response = await this.service.findAllSchedulingPendingByPlaceResponsible(this.getUserRegistration());
    const schedulingsPending = response.data;

    for (const scheduling of schedulingsPending) {
      const schedulingCreator = await this.findUserCreatorName(scheduling.creator);
      scheduling.creator = schedulingCreator;
    }

    this.setState({ schedulingsPending });
  };

  delete = (schedulingId) => {
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
          <h1 className="title">Agendamentos Pendentes</h1>
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
