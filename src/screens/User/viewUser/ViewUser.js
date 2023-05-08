import React from "react";
import 'bootswatch/dist/minty/bootstrap.css';
import { withRouter } from 'react-router-dom';
import UserApiService from "../../../services/UserApiService";
import FormGroup from "../../../componentes/FormGroup";
import SportsFavoriteTable from "../../../componentes/SportsFavoriteTable";

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

    delete = (userId) => {
        //axios.delete(`http://localhost:8080/api/user/${userId}`,
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
        this.props.history.push(`/updateUser/${userId}`);
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

        // if (this.state.id !== 0) {
        //     if (params !== '?') {
        //         params = `${params}&`;
        //     }

            params = `${params}id=${this.getLoggedUser().id}`;
        // }

        // if (this.state.name !== '') {
        //     if (params !== '?') {
        //         params = `${params}&`;
        //     }

        //     params = `${params}name=${this.state.name}`;
        // }

        // if (this.state.email !== '') {
        //     if (params !== '?') {
        //         params = `${params}&`;
        //     }

        //     params = `${params}email=${this.state.email}`;
        // }

        // if (this.state.username !== '') {
        //     if (params !== '?') {
        //         params = `${params}&`;
        //     }

        //     params = `${params}registration=${this.state.registration}`;
        // }

        // if (this.state.role.name !== '') {
        //     if (params !== '?') {
        //         params = `${params}&`;
        //     }

        //     params = `${params}role=${this.state.role}`;
        // }

        // if (this.state.selectedSportsFavorite.id !== 0) {
        //     if (params !== '?') {
        //         params = `${params}&`;
        //     }

        //     params = `${params}selectedSportsFavoriteId=${this.state.selectedSportsFavoriteId}`;
        // }

        //axios.get(`http://localhost:8080/api/user/${params}`)
        
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

        //axios.get(`http://localhost:8080/api/user`)
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
                        
                       

                        <FormGroup label='Nome' htmlFor='name'>
                            <input className="form-control" type="text" id="name" value={this.state.user.name}disabled={true}
                           />
                        </FormGroup>

                        <FormGroup label='Email' htmlFor='lab'>
                            <input className="form-control" type="text" id="email" value={this.state.user.email}disabled={true}
                            />
                        </FormGroup>

                        <FormGroup label='Matrícula' htmlFor='lab'>
                            <input className="form-control" type="text" id="registration" value={this.state.user['registration']}disabled={true}
                            onChange={(e) => {this.setState({registration: e.target.value})}}/>
                        </FormGroup>
                   
                       
                        <br/>
                        <br/>
                        <button type="button" className="btn btn-primary" onClick={this.create}>Cadastrar novo agendamento</button>
                      
                        <br/>
                        <FormGroup className="tittleTable" label="Esportes Favoritos">
                        <SportsFavoriteTable sportsFavorite={this.state.selectedSportsFavorite}/>
                       </FormGroup>
                    </fieldset>
                    <br/>
                </header>  
            </div>
        )
    }
}

export default withRouter(ViewUser);