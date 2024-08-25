import axios from "axios";
import React, { useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
const DDSports = (props) => {
  const [sports, setSports] = React.useState([]); //array vazio aqui no final para prevenir erro de undefined tentando ser mapeado.

  function findPlaces() {
    axios
      .get("http://localhost:8080/api/sport")
      .then((Response) => {
        const places = Response.data;
        setSports(places);
        console.log("sports", places);
      })
      .catch((error) => {
        console.log(error.Response);
      });
  }

  React.useEffect(() => {
    //componentDidMount das funções.
    findPlaces();
  }, []);

  return (
    <Autocomplete
      options={sports}
      getOptionLabel={(option) => option.name}
      onChange={(event, newValue) => {
        props.onChange(newValue ? newValue.id : "");
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          label={props.title || "Esporte"}
          variant="outlined"
        />
      )}
    />
  );
};

export default DDSports;
