import React from "react";
import 'bootswatch/dist/minty/bootstrap.css';
import { withRouter } from 'react-router-dom';
import UserApiService from "../../../services/UserApiService";
import FormGroup from "../../../componentes/FormGroup";
import DDSportsFavorite from "../../../componentes/DropDown/DDSportsFavorite";

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
    find = () => {
        var params = '?';

        if (this.state.id !== 0) {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}id=${this.state.id}`;
        }

        if (this.state.name !== '') {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}name=${this.state.name}`;
        }

        if (this.state.email !== '') {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}email=${this.state.email}`;
        }

        if (this.state.username !== '') {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}registration=${this.state.registration}`;
        }

        if (this.state.role.name !== '') {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}role=${this.state.role}`;
        }

        if (this.state.selectedSportsFavorite.id !== 0) {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}selectedSportsFavoriteId=${this.state.selectedSportsFavoriteId}`;
        }

        //axios.get(`http://localhost:8080/api/user/${params}`)
        this.service.find(params)
            .then(response => {
                const users = response.data;
                this.setState({ users });
                this.state.user = users[0]
                this.state.id = this.state.user['id']
                console.log("user",  this.state.user);
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
                        
                        <FormGroup label='ID' htmlFor='lab'>
                            <input className="form-control-small" type="number" id="lab" value={this.state.id}
                            onChange={(e) => {this.setState({id: e.target.value})}}/>
                        </FormGroup>
                        <FormGroup label='Nome' htmlFor='lab'>
                            <input className="form-control" type="text" id="lab" value={this.state.user['name']}disabled={true}
                            onChange={(e) => {this.setState({name: e.target.value})}}/>
                        </FormGroup>
                        <FormGroup label='Email' htmlFor='lab'>
                            <input className="form-control" type="text" id="lab" value={this.state.user['email']}disabled={true}
                            onChange={(e) => {this.setState({email: e.target.value})}}/>
                        </FormGroup>
                        <FormGroup label='Matrícula' htmlFor='lab'>
                            <input className="form-control" type="text" id="lab" value={this.state.user['registration']}disabled={true}
                            onChange={(e) => {this.setState({registration: e.target.value})}}/>
                        </FormGroup>
                   
                        <FormGroup label='' htmlFor='lab' className="filterOptions">
                            <DDSportsFavorite id="lab" onChange={this.handleInputChangeSport} />
                        </FormGroup>
                        <br/>
                        <br/>
                        <button type="button" className="btn btn-primary" onClick={this.create}>Cadastrar novo agendamento</button>
                    </fieldset>
                    <br/>
                </header>  
            </div>
        )
    }
}

export default withRouter(ViewUser);