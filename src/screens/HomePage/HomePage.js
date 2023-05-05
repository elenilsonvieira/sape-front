import React from "react";
import './HomePage.css'
import 'bootswatch/dist/minty/bootstrap.css';

export default class HomePage extends React.Component {
   
    state = {
        isLoggedIn: false // Inicialmente, o usuário não está logado
    }

    componentDidMount(){
        this.verifyLogged();

    }

    login = () => {
        this.props.history.push("/login");
    }

    verifyLogged(){   
        const user = JSON.parse(localStorage.getItem('loggedUser'));

        if(user){
            this.setState(  {isLoggedIn: !this.state.isLoggedIn});       
        }     
    }
    
    render() {
        return(
            <div className="HomePage1">
                <h1>Sejam Bem Vindo(a)s!</h1>
                <h2>SAPE</h2>
                <h3>O SAPE é um sistema voltado para funcionários, alunos e professores do IFPB - Campus Monteiro, tendo como objetivo facilitar o gerenciamento e programação das atividades físicas praticadas na instituição. No SAPE, a comunidade acadêmica pode agendar a prática de determinados exercícios físicos no campus, consultar dias e horários dos mesmas e interessados poderão confirmar presença na prática.</h3>
                <br/>
                {this.state.isLoggedIn ? null : (
                    
                    <button type="button" className="btn btn-primary" onClick={this.login} >Login</button>      
                
                )}
                
            </div>

        )
    }
}
