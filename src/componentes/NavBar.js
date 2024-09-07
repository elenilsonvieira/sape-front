import React from "react";
import NavbarItem from "./NavbarItem";
import "./Components.css";
import { AuthConsumer } from "../main/SessionProvider";
import StorageService from "../services/StorageService";
import { LOGGED_USER } from "../services/ApiService";

function NavBar(props) {
  const storageService = new StorageService();

  const getUserName = () => {
    return storageService.getItem(LOGGED_USER).name;
  }

  return (
    <div className="navbar navbar-expand-lg fixed-top navbar-light bg-light" >
      <div className="container">
        <a href="/" className="navbar-brand">
          SAPE
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav">
            <NavbarItem
              render={!props.isAuthenticated}
              href="/login"
              label="Login"
            />

            <NavbarItem
              render={props.isAuthenticated}
              href="/listPlaces"
              label="Locais"
            />
           
            <NavbarItem
              render={props.isAuthenticated}
              href="/listSports"
              label="Esportes"
            />

            <NavbarItem
              render={props.isAuthenticated}
              href="/listScheduling"
              label="Agendamentos"
            />

            <NavbarItem
              render={props.isAuthenticated}
              href="/viewUser"
              label="Perfil do Usuário"
            />

            <NavbarItem
              render={props.isAuthenticated}
              href="/login"
              onClick={props.logout}
              label="Sair"
            />
            
          </ul>
        </div>
        {
          props.isAuthenticated && (
            <div style={{
              paddingTop: '1rem'
            }}>
              <p>{getUserName()}</p>
            </div>
          )
        }
      </div>
    </div>
  );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <AuthConsumer>
    {(context) => (
      <NavBar isAuthenticated={context.isAuthenticated} logout={context.end} />
    )}
  </AuthConsumer>
);
