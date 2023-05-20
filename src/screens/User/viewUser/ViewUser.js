import React from "react";
import 'bootswatch/dist/minty/bootstrap.css';
import './ViewUser.css'
import { withRouter } from 'react-router-dom';
import UserApiService from "../../../services/UserApiService";
import FormGroup from "../../../componentes/FormGroup";
import SportsFavoriteTable from "../../../componentes/SportsFavoriteTable";
import { showErrorMessage,showSuccessMessage } from "../../../componentes/Toastr";

class ViewUser extends React.Component {
    state = {
        id: '',
        name: '',
        email: '',
        registration: '',
        role: '',
        selectedSportsFavorite:[],
        users :[],
        user: ''
    }
     
    constructor() {
        super();
        this.service = new UserApiService();
    }
    componentDidMount() {    
        this.find();
    }

    // componentWillUnmount() {
    //     this.clear();
    // }

    getLoggedUser = () =>{
        
        var user = JSON.parse(localStorage.getItem('loggedUser'));

        if (user == null) {

            user = " ";
        }
        console.log(user)

        return user;
    }

    removeSportsFavorite = (sportId) => {
            
        this.service.removeSportsFavorite(this.getLoggedUser().id,sportId)

        .then( Response => {  

            showSuccessMessage("Esporte Removido dos favoritos");
            this.find();

        }).catch( error => {

            showErrorMessage(error.response.data);
            showErrorMessage("Ocorreu um erro ao excluir o esporte, tente novamente!");
        });
    }

    delete = (userId) => {
        this.service.delete(userId)
            .then(response => {
                this.find();
            }
            ).catch(error => {
                console.log(error.response);
            }
            );
    }

    edit = (userId) => {
        this.props.history.push(`/updateUser/${this.getLoggedUser().id}`);
    }

    createUser = () => {
        this.props.history.push(`/createUser`);
    }
    create = () =>{
        this.props.history.push('/createScheduling')
    
    }

  
    replace = () =>{

        
        document.getElementById("name").value = this.state.user.name;
        document.getElementById("registration").value = this.state.user.registration;
         
       
    }

    find = () => {
        var params = '?';

       
            params = `${params}id=${this.getLoggedUser().id}`;
       
            console.log("🚀 ~ file: ViewUser.js:102 ~ ViewUser ~ this.getLoggedUser().id:", this.getLoggedUser().id)
        
        this.service.find(params)
            .then(response => {
                const users = response.data;  
                this.state.user = users[0]
                this.state.selectedSportsFavorite = users[0].sportsFavorite; 
                const sportsFavorite = this.state.selectedSportsFavorite;
                this.setState({users});
                this.setState({ sportsFavorite });

                this.replace();
              
                console.log("user",  this.state.selectedSportsFavorite);
                console.log("users",  this.state.users);
              

            }
            ).catch(error => {
                console.log(error.response);
            }
            );
    }

    findAll = () => {

        this.service.findAll()
            .then(response => {
                const users = response.data;
                this.setState({ users });
                console.log(users);
            }
            ).catch(error => {
                console.log(error.response);
            }
            );
    }

    render() {
        return (
            <div>
                <header className="App-header">
                    <fieldset>
                        <h1 className="title">Perfil</h1>
                        
                        
                    <div className="container-user">
                        <FormGroup label='Nome' htmlFor='name'>
                            <input className="form-control" type="text" id="name" value={this.state.user.name || ''}disabled={true}
                        />
                        </FormGroup>

                        <FormGroup label='Email' htmlFor='lab'>
                            <input className="form-control" type="text" id="email" value={this.state.user.email || ''}disabled={true}
                            />
                        </FormGroup>

                        <FormGroup label='Matrícula' htmlFor='lab'>
                            <input className="form-control" type="text" id="registration" value={this.state.user['registration'] || ''}disabled={true}
                            onChange={(e) => {this.setState({registration: e.target.value})}}/>
                        </FormGroup>
                    
                        
                        <br/>
                        <br/>
                        <div className="btn-perfil">
                            <button type="button" className="btn btn-primary" onClick={this.create}>Cadastrar novo agendamento</button>
                            <button type="button" className="btn btn-secondary" onClick={this.edit}>Atualizar dados</button>
                        </div>
                        <br/>
                        <span id="user-spo" >Esportes Favoritos </span>
                    <br />
                    <br />

                    <div id="sportfavorite">
                        <SportsFavoriteTable sportsFavorite={this.state.selectedSportsFavorite} delete={this.removeSportsFavorite}/>
                    </div>

                    </div>
                    </fieldset>
                    <br/>
                </header>  
            </div>
        )
    }
}

export default withRouter(ViewUser);