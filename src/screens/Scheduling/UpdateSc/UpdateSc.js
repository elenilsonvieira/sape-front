import React from "react";
import "./UpdateSc.css";
import "bootswatch/dist/minty/bootstrap.css";
import FormGroup from "../../../componentes/FormGroup";
import DDPlaces from "../../../componentes/DropDown/DDPlaces";
import DDSports from "../../../componentes/DropDown/DDSport";
import SchedulingApiService from "../../../services/SchdulingApiService";
import {
  showSuccessMessage,
  showErrorMessage,
} from "../../../componentes/Toastr";

export default class UpdateSc extends React.Component {
  state = {
    id: 0,
    date: "",
    startTime: "",
    finishTime: "",
    selectedOptionPlace: "",
    location:"",
    selectedOptionSport: "",
    title: "",
    creator: "",
  };

  constructor() {
    super();
    this.service = new SchedulingApiService();
  }

  componentDidMount(){
    const params = this.props.match.params;
    const id = params.id;
    this.findById(id);
  }

  findById = (scheduledId) => {
    this.service.get(`/${scheduledId}`)
      .then(response => {
        const scheduled = response.data;
  
        const {
          id,
          scheduledDate,
          scheduledStartTime,
          scheduledFinishTime,
          placeId,
          location,
          sportId,
          title,
          creator,
        } = scheduled;
  
        
        this.setState({
          id,
          date: scheduledDate,
          startTime: scheduledStartTime,
          finishTime: scheduledFinishTime,
          selectedOptionPlace: placeId,
          location:location,
          selectedOptionSport: sportId,
          title:title,
          creator,
        });
      })
      .catch(error => {
        console.log(error.response);
      });
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

  update = async () => {
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

    await this.service
      .update(this.state.id, {
        id:this.state.id,
        scheduledDate: this.state.date,
        scheduledStartTime: this.state.startTime,
        scheduledFinishTime: this.state.finishTime,
        placeId: this.state.selectedOptionPlace,
        sportId: this.state.selectedOptionSport,
        creator: getUserRegistration(),
      })
      .then((Response) => {
        showSuccessMessage("Prática atualizada com sucesso!");
        console.log(Response);
        this.props.history.push("/listScheduling");
      })
      .catch((error) => {
        showErrorMessage(error.response.data);
        console.log(error.Response);
      });
  };

  cancel = () => {
    this.props.history.push("/listScheduling");
  };

  handleInputChangePlace = (e) => {
    console.log("place:", e);
    this.setState({ selectedOptionPlace: e }, () => {
      console.log("place selected", this.state.selectedOptionPlace);
    });
  };
  // handleInputChangePlace = (e) => {
  //     this.setState({selectedOptionPlace: e.target.value}, () => {
  //         console.log("Id do Local selecionado: ", this.state.selectedOptionPlace);
  //     });
  // }

  handleInputChangeSport = (e) => {
    this.setState({ selectedOptionSport: e }, () => {
      console.log(
        "Id do Esporte selecionado: ",
        this.state.selectedOptionSport
      );
    });
  };

  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="title">Atualizar prática</h1>
          <fieldset className="fieldset-sched">
            <FormGroup label="Data" htmlFor="lab01" className="FieldSetSc">
            <input
              className="form-control noMargin"
              type="date"
              id="lab"
              value={this.state.date}
              onChange={(e) => {
              this.setState({ date: e.target.value });
              }}
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
                value={this.state.startTime}
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
                value={this.state.finishTime}
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
            className="FieldSetDDsP">
              <DDPlaces
              className="dds"
              id="noMargin"
              value={this.state.selectedOptionPlace}
              location={this.state.location}
              onChange={this.handleInputChangePlace}
              />
            </FormGroup>

            <FormGroup 
            label="Selecione o esporte" 
            htmlFor="lab05" 
            className="FieldSetDDsS">
            
              <DDSports
              className="dds"
              id="noMargin"
              value={this.state.selectedOptionSport}
              title={this.state.title}
              onChange={this.handleInputChangeSport}
              />
            </FormGroup>
            <br />
            <br />
            <br />
            <button
              onClick={this.update}
              type="button"
              className="btn btn-primary btnsCreateSc"
            >
              Atualizar
            </button>
            <button
              onClick={this.cancel}
              type="button"
              className="btn btn-danger btnsCreateSc"
            >
              Cancelar
            </button>
          </fieldset>
        </header>
        <footer className="foot"></footer>
      </div>
    );
  }
}