import React from "react";
import axios from "axios";

const GetUserOrNameUser = (props) => {

    const [name, setName] = React.useState([]);

    React.useEffect(() => { //componentDidMount das funções.
        findName();
    });

    async function findName() {
        let namefind= "";
        if(props.label === "user") {
            try {
                const Response = await axios.get(`http://localhost:8080/api/scheduling/${props.id}`
                );
                const userInDb = Response.data;
                console.log("user: ", userInDb);
                namefind = userInDb.name;
            } catch (error) {
                console.log(error.Response);
            }
        } else {
            alert("informe \"label=user/user\" em getUserName");
        };
        //console.log('dentro do método: ', namefind);
        setName(namefind);
    };

    return(
        <td>{name}</td>
    );
}

export default GetUserOrNameUser;