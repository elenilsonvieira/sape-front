import React, { useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

const DDUsers = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    findPlaces();
  }, []);

  function findPlaces() {
    axios
      .get("http://localhost:8080/api/user")
      .then((response) => {
        const users = response.data;
        setUsers(users);
        console.log("users", users);
      })
      .catch((error) => {
        console.log(error.response);
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
