import React, { useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import SportApiService from "../../services/SportApiService";
import { showErrorMessage} from "../../../src/componentes/Toastr";

const DDSports = (props) => {
  const [sports, setSports] = useState([]);
  const service = new SportApiService();

  function findSports() {
    service.find("")
      .then((response) => {
        const sports = response.data;
        setSports(sports);
      })
      .catch((error) => {
        showErrorMessage(error.response.data);
      });
  }

  useEffect(() => {
    findSports();
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
          label="Esporte"
          variant="outlined"
        />
      )}
    />
  );
};

export default DDSports;
