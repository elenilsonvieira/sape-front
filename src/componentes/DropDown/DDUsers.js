import React, { useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import UserApiService from "../../../src/services/UserApiService";
import { showErrorMessage} from "../../../src/componentes/Toastr";

const DDUsers = (props) => {
  const [users, setUsers] = useState([]);
  const service = new UserApiService();

  useEffect(() => {
    findUsers();
  }, []);

  function findUsers() {
    service.find("")
      .then((response) => {
        const users = response.data;
        setUsers(users);
      })
      .catch((error) => {
        showErrorMessage(error.response.data);
      });
  }

  return (
    <Autocomplete
      options={users}
      getOptionLabel={(option) => option.name}
      onChange={(event, newValue) => {
        props.onChange(newValue ? newValue : "");
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          label={props.label}
          variant="outlined"
        />
      )}
    />
  );
};

export default DDUsers;
