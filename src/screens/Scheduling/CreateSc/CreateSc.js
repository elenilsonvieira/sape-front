import React from "react";
import "./CreateSc.css";
import "bootswatch/dist/minty/bootstrap.css";
import FormGroup from "../../../componentes/FormGroup";
import DDPlaces from "../../../componentes/DropDown/DDPlaces";
import DDSports from "../../../componentes/DropDown/DDSport";
import SchedulingApiService from "../../../services/SchdulingApiService";
import {
  showSuccessMessage,
  showErrorMessage,
} from "../../../componentes/Toastr";
import DateInput from "../../../componentes/DateInput";
import AppFooter from "../../../componentes/AppFooter";

export default class CreateSc extends React.Component {
  state = {
    date: "",
    startTime: "",
    finishTime: "",
    selectedOptionPlace: "",
    selectedOptionSport: "",
    creator: "",
  };

  constructor() {
    super();
    this.service = new SchedulingApiService();
  }

  async updateStateAsync(date) {
    // Atualiza o estado e usa um callback para verificar o valor atualizado
    await new Promise(resolve => {
      this.setState({ date }, () => {
        // Isso será executado após a conclusão da atualização do estado
        console.log("data do state (updateStateAsync): " + this.state.date);
        resolve(); // Resolvendo a Promise
      });
    });
  }
  
  componentDidUpdate(prevProps, prevState) {
    // Verifica se o estado foi atualizado
    if (this.state.date !== prevState.date) {
      console.log("data do state (render): " + this.state.date);
    }
  }
  
  componentDidMount() {
    // Obtém a data da URL
    const urlParams = new URLSearchParams(window.location.search);
    const dateFromUrl = urlParams.get("date");
  
    if (dateFromUrl) {
      console.log(dateFromUrl);
      this.updateStateAsync(dateFromUrl);
    }
  }
  
  validate = () => {
    const errors = [];

    if (!this.state.date) {
      errors.push(
        "É obrigatório informar a data em que acontecerá a prática esportiva!"
      );
    }

    if (!this.state.startTime) {
      errors.push(
        "É obrigatório informar o horário em que a prática esportiva começará!"
      );
    }

    if (!this.state.finishTime) {
      errors.push(
        "É obrigatório informar o horário em que a prática esportiva terminará!"
      );
    }

    if (!this.state.selectedOptionPlace) {
      errors.push("É obrigatório selecionar um local!");
    }

    if (!this.state.selectedOptionSport) {
      errors.push("É obrigatório selecionar um esporte!");
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

    const getUserRegistration = () => {
      const user = JSON.parse(localStorage.getItem("loggedUser"));
      return user.registration;
    };

    this.service
      .create({
        scheduledDate: this.state.date,
        scheduledStartTime: this.state.startTime,
        scheduledFinishTime: this.state.finishTime,
        placeId: this.state.selectedOptionPlace,
        sportId: this.state.selectedOptionSport,
        creator: getUserRegistration(),
      })
      .then((response) => {
        showSuccessMessage("Prática agendada com sucesso!");
        this.props.history.push("/listScheduling");
      })
      .catch((error) => {
        showErrorMessage(error.response.data);
      });
  };

  cancel = () => {
    this.props.history.push("/listScheduling");
  };

  handleInputChangePlace = (e) => {
    this.setState({ selectedOptionPlace: e });
  };

  handleInputChangeSport = (e) => {
    this.setState({ selectedOptionSport: e });
  };

  handleDateChange = (date) => {
    this.setState({date: date});
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="title">Agendar prática</h1>
          <div className="form-container">
            <fieldset className="fieldset-sched">
            <FormGroup label="Data" htmlFor="lab01" className="FieldSetSc">
                <DateInput
                  onDateChange={this.handleDateChange}
                />
              </FormGroup>
              <FormGroup
                label="Hora de Início da prática"
                htmlFor="lab02"
                className="FieldSetSc"
              >
                <input
                  className="form-control noMargin"
                  type="time"
                  id="lab"
                  onChange={(e) => {
                    this.setState({ startTime: e.target.value });
                  }}
                />
              </FormGroup>
              <FormGroup
                label="Hora de término da prática"
                htmlFor="lab03"
                className="FieldSetSc"
              >
                <input
                  className="form-control noMargin"
                  type="time"
                  id="lab"
                  onChange={(e) => {
                    this.setState({ finishTime: e.target.value });
                  }}
                />
              </FormGroup>
              <br />
              <br />
              <FormGroup
                label="Selecione o local"
                htmlFor="lab04"
                className="FieldSetDDsP"
              >
                <DDPlaces
                  className="dds"
                  id="noMargin"
                  onChange={this.handleInputChangePlace}
                />
              </FormGroup>
              <FormGroup
                label="Selecione o esporte"
                htmlFor="lab05"
                className="FieldSetDDsS"
              >
                <DDSports
                  className="dds"
                  id="noMargin"
                  onChange={this.handleInputChangeSport}
                />
              </FormGroup>
              <br />
              <br />
              <br />
              <button
                onClick={this.post}
                type="button"
                className="btn btn-primary btnsCreateSc Buttondefault "
              >
                Salvar
              </button>
              <button
                onClick={this.cancel}
                type="button"
                className="btn btn-danger btnsCreateSc"
              >
                Cancelar
              </button>
            </fieldset>
          </div>
        </header>
        <AppFooter />
      </div>
    );
  }
}
