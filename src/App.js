import React from "react";
import "./App.css";
import NavBar from "./componentes/NavBar";
import AppRoutes from "./main/AppRoutes";
import SessionProvider from "./main/SessionProvider";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import "toastr/build/toastr.css";
import "toastr/build/toastr.min.js";

export default class App extends React.Component {
  render() {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SessionProvider>
          <NavBar />
          <AppRoutes />
        </SessionProvider>
      </LocalizationProvider>
    );
  }
}
