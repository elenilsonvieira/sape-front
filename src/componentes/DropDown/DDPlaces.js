import axios from "axios";
import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';




    const DDPlaces = (props) => {
        const [places, setPlaces] = useState([]);
      
        useEffect(() => {
          findPlaces();
        }, []);
      
        function findPlaces() {
          axios
            .get('http://localhost:8080/api/place')
            .then((response) => {
              const places = response.data;
              setPlaces(places);
              console.log('places', places);
            })
            .catch((error) => {
            console.log(error.response);
            });
        }
      
       
        
          return (
            <Autocomplete
              options={places}
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) => {
                props.onChange(newValue ? newValue.id : null); 
              }}
              renderInput={(params) => (
                <TextField {...params} label="Local" variant="outlined" />
              )}
            />
          );
        };
        

export default DDPlaces;