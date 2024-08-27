import PlaceApiService from "../../services/PlaceApiService";
import React, { useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { showErrorMessage} from "../../componentes/Toastr";

const DDPlaces = (props) => {
  const [places, setPlaces] = useState([]);
  const service = new PlaceApiService();

  useEffect(() => {
    findPlaces();
  }, []);

  function findPlaces() {
    service.find("")
      .then((response) => {
        const places = response.data;
        setPlaces(places);
      })
      .catch((error) => {
        showErrorMessage(error.response.data);
      });
  }

  return (
    <Autocomplete
      options={places}
      getOptionLabel={(option) => option.name}
      onChange={(event, newValue) => {
        props.onChange(newValue ? newValue.id : "");
      }}
      renderInput={(params) => (
        <TextField {...params} size="small" label={props.location || "Local"} variant="outlined" />
      )}
    />
  );
};

export default DDPlaces;
