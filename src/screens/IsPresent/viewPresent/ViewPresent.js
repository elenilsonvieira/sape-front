import React from "react";
import { withRouter } from "react-router-dom";
import SchedulingUsertable from "../../../componentes/SchedulingUserTable";
import {showErrorMessage, showSuccessMessage} from "../../../componentes/Toastr";
import SchedulingApiService from "../../../services/SchedulingApiService";
import UserApiService from "../../../services/UserApiService";

class ViewPresent extends React.Component {
  state = {
    users: [],
    schedulingUser: [],
  };

  constructor() {
    super();
    this.service = new SchedulingApiService();
    this.userService = new UserApiService();
  }

  componentDidMount() {
    this.findSchedulingsUser();
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

  removeIsPresent = (schedulingId) => {
    this.service
      .removeIsPresent(schedulingId, this.getLoggedUser().registration)

      .then((Response) => {
        showSuccessMessage("Presença Cancelada");
        this.findSchedulingsUser();
      })
      .catch((error) => {
        showErrorMessage(error.response.data);
        showErrorMessage(
          "Ocorreu um erro ao cancelar presença, tente novamente!"
        );
      });
  };

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

  findUserCreatorName = async (registration) => {
    const response = await this.userService.findByRegistration(registration);
    return response.data.name;
  }

  findSchedulingsUser = async () => {
    const response = await this.service.confirmedByUser(this.getUserRegistration());
    const schedulings = response.data;

    for (const scheduling of schedulings) {
      const schedulingCreator = await this.findUserCreatorName(scheduling.creator);
      scheduling.creator = schedulingCreator;
    }
        
    this.setState({schedulingUser: schedulings });
  };

  find = (schedulingId) => {
    this.service
      .findAllParticpants(schedulingId)
      .then((response) => {
        const users = response.data;
        this.setState({ users });
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
          <h1 className="title">Agendamentos Confirmados</h1>
          <fieldset className="field-usersched">
            <br />
            <br />
            <br />
            <div className="table-sched">
              <SchedulingUsertable
                schedulings={this.state.schedulingUser}
                viewParticipants={this.viewParticipants}
                delete={this.delete}
                removeIsPresent={this.removeIsPresent}
              />
            </div>
          </fieldset>
          <br />
          {/* <button onClick={this.create} type="button" className="btn btn-primary">Cadastrar novo agendamento</button> */}
        </header>
        <footer className="footer-usersched"></footer>
      </div>
    );
  }
}

export default withRouter(ViewPresent);
