import React from "react";
import "./ViewScheduling.css";
import "bootswatch/dist/minty/bootstrap.css";
import { withRouter } from "react-router-dom";
import SchedulingTable from "../../../componentes/SchedulingTable";
import SchedulingApiService from "../../../services/SchdulingApiService";
import FormGroup from "../../../componentes/FormGroup";
import DDPlaces from "../../../componentes/DropDown/DDPlaces";
import DDSports from "../../../componentes/DropDown/DDSport";
import {
  showSuccessMessage,
  showErrorMessage,
} from "../../../componentes/Toastr";
import axios from "axios";
import Calendar from "../../calendar/Calendar";
import { LOGGED_USER } from "../../../services/ApiService";
import UserApiService from "../../../services/UserApiService";
import AppFooter from "../../../componentes/AppFooter";
import DateInput from "../../../componentes/DateInput";

class ViewScheduling extends React.Component {
  state = {
    scheduling: [],
    creator: "",
    selectedPlace: "",
    selectedSport: "",
    date: "",
  };

  constructor() {
    super();
    this.service = new SchedulingApiService();
    this.serviceUser = new UserApiService();
  }

  find = async () => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    console.log("user", user.registration);
    
      await this.service
      .findWithCreatorAndResponsible(user.registration)
      .then((Response) => {
        const scheduling = Response.data;
        this.setState({ scheduling: scheduling });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  findAllParticpants = (schedulingId) => {
    this.service
      .findAllParticpants(schedulingId)
      .then((Response) => {
        const users = Response.data;
        this.setState({ users: users });
      })
      .catch((error) => {
        console.log(error.Response);
      });
  };

  delete = (schedulingId) => {
    this.service
      .delete(schedulingId)
      .then((Response) => {
        showSuccessMessage("Agendamento excluído com sucesso!");
        this.find();
      })
      .catch((error) => {
        showErrorMessage(error.response.data);
        console.log(error.Response);
      });
  };

  viewParticipants = (schedulingId) => {
    this.props.history.push(`/viewParticipants/${schedulingId}`);
  };
  viewSchedulingPending = () => {
    this.props.history.push(`/viewSchedulingPending`);
  };

  create = () => {
    this.props.history.push("/createScheduling");
  };

  perfil = (userId) => {
    this.props.history.push(`/viewUser/${userId}`);
  };

  confirm = () => {
    this.props.history.push("/viewPresent");
  };

  componentDidMount() {
    this.find();
  }

  getUserRegistration = () => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    return user.registration;
  };
  getUserEmail = () => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    return user.email;
  };

  handleInputChangePlace = (place) => {
    this.setState({ selectedPlace: place });
  };

  handleInputChangeSport = (sport) => {
    this.setState({ selectedSport: sport });
  };

  filterSearch = () => {
    let aplyFilters = "?";

    const filters = [
      ["date=", this.state.date],
      ["placeId=", this.state.selectedPlace],
      ["sportId=", this.state.selectedSport],
    ];
    for (let fil of filters) {
      if (fil[1] !== "") {
        aplyFilters += `${fil[0]}${fil[1]}&`;
      }
    }

    this.service
      .findWithFilter(aplyFilters)
      .then((Response) => {
        const scheduling = Response.data;
        this.setState({ scheduling: scheduling });
      })
      .catch((error) => {
        console.log(error.Response);
      });
  };

  addParticipant = (schedulingId) => {
    axios
      .patch(
        `http://localhost:8080/api/scheduling/${schedulingId}/addParticipant`,
        { matricula: this.getUserRegistration() }
      )
      .then((response) => {
        showSuccessMessage(
          "Você demonstrou interesse em participar da prática!"
        );
      })
      .catch((error) => {
        showErrorMessage(error.response);
      });
  };

  removeParticipant = (schedulingId) => {
    this.service
      .removeParticipant(schedulingId)
      .then((response) => {
        showSuccessMessage("Interesse em participar da prática retirado!");
      })
      .catch((error) => {
        showErrorMessage(error.response.data);
      });
  };

  addIsPresent = (schedulingId) => {
    this.service
      .addIsPresent(schedulingId, this.getUserRegistration())
      .then((response) => {
        showSuccessMessage("Presença confirmada nessa prática!");
      })
      .catch((error) => {
        showErrorMessage(error.response);
      });
  };

  edit = (schedulingId) => {
    this.props.history.push(`/updateScheduling/${schedulingId}`);
  }

  confirmScheduling = (schedulingId) => {
    this.service
    .approveScheduling(schedulingId)
    .then((response) => {
      this.find();
      showSuccessMessage("Agendamento confirmado!");
    })
    .catch((error) => {
      showErrorMessage(error.response);
    });
  };

  handleDateChange = (date) => {
    this.setState({date: date});
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <fieldset>
            <h1 className="title">Agendamentos</h1>
            <div className="card mb-3 cardScheduling">
              <h3 className="card-header">
                Filtrar
                <div className="card-body">
                  <h5 className="card-title">
                    Selecione filtros a serem aplicados
                  </h5>
                  <FormGroup
                    label="Selecionar"
                    htmlFor="lab"
                    className="filterOptions"
                  >
                    <DDPlaces onChange={this.handleInputChangePlace} />
                  </FormGroup>
                  <FormGroup
                    label="Selecionar"
                    htmlFor="lab"
                    className="filterOptions"
                  >
                    <DDSports id="lab" onChange={this.handleInputChangeSport} />
                  </FormGroup>
                  <FormGroup
                    label="Data"
                    htmlFor="lab"
                    className="filterOptions"
                  >
                    <input
                      className="form-sched"
                      type="date"
                      id="lab"
                      onChange={(e) => {
                        this.setState({ date: e.target.value });
                      }}
                    />
                  </FormGroup>

                  <br />
                  <br />
                  <button
                    onClick={this.filterSearch}
                    type="button"
                    className="btn btn-success buttonFilter  Buttondefault"
                  >
                    Aplicar Filtro
                  </button>
                  <button
                    onClick={this.find}
                    type="button"
                    className="buttonFilter btn btn-info Buttondefault"
                  >
                    Mostrar Todos
                  </button>
                  <button
                    onClick={this.create}
                    type="button"
                    className="btn btn-primary btnSc Buttondefault"
                  >
                  Novo Agendamento
                  </button>
                  <button
                    onClick={this.viewSchedulingPending}
                    type="button"
                    className="btn btn-danger btnScPen bntSheduling Buttondefault"
                    title="Aguardando aprovação"
                  >
                   Pendentes
                  </button>

                  <button
                    onClick={this.confirm}
                    type="button"
                    className="btn btn-danger btnScPen bntSheduling Buttondefault"
                    title="Agendamentos Confirmados"
                  >
                    Confirmados
                  </button>
                </div>
              </h3>
            </div>
            <br />
            <br />
            
            <Calendar
                  schedulings={this.state.scheduling}
                  viewParticipants={this.viewParticipants}
                  delete={this.delete}
                  addIsPresent={this.addIsPresent}
                  edit={this.edit}
                  confirmScheduling={this.confirmScheduling}
                />
          </fieldset>
          
          <br /><br /><br />
        </header>
        <AppFooter />
      </div>
    );
  }
}

export default withRouter(ViewScheduling);
