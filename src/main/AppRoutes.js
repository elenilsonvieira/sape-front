import React from "react";
import {Route, BrowserRouter, Switch, Redirect, useHistory} from 'react-router-dom';

import HomePage from "../screens/HomePage/HomePage";
import Login from "../screens/Login/Login";


import CreatePlace from "../screens/Place/CreateP/CreatePlace";
import UpdatePlace from "../screens/Place/UpdateP/UpdatePlace";
import ListPlaces from "../screens/Place/ListAllP/ViewPlaces";
import ViewResponsibles from "../screens/Place/viewResponsibles/ViewResponsibles";
import calendario from "../screens/calendar/Calendar";

import CreateSport from "../screens/Sport/CreateS/CreateSport";
import UpdateSport from "../screens/Sport/UpdateS/UpdateSport";
import ListSports from "../screens/Sport/ListAllS/ViewSports";

import CreateScheduling from "../screens/Scheduling/CreateSc/CreateSc";
import ListScheduling from "../screens/Scheduling/ListAllSchedulings/ViewScheduling";
import UpdateSc from "../screens/Scheduling/UpdateSc/UpdateSc";

import { AuthConsumer } from "./SessionProvider";
import ViewUser from "../screens/User/viewUser/ViewUser";

import ViewPresent from "../screens/IsPresent/viewPresent/ViewPresent"; 
import ViewParticipants from "../screens/IsPresent/viewPresent/ViewParticipants";
import UpdateUser from "../screens/User/updateUser/UpdateUser";
import ViewSchedulingPending from "../screens/Scheduling/ListAllSchedulings/ViewSchedulingPending";

function RestrictedRoute( {component: Component, show, ...props} ) {
    return(
        <Route exact {...props} render={ (componentProps) => {
            if(show){
                return (
                    <Component {...componentProps} />
                )
            }else{
                return(
                    <Redirect to={ {pathname : '/login', state : { from: componentProps.location}}} />
                )
            }
        }} />
    )

}

function AppRoutes(props) {
    return (

        <BrowserRouter>
            <Switch>

            <Route component = { HomePage } path="/" exact/>
            <Route path="/login">
                {props.isAuthenticated ? (
                <Redirect to="/" />
                ) : (
                 <Login />
                )}
            </Route>

            <RestrictedRoute show={props.isAuthenticated} component = { ListPlaces } path="/listPlaces" />
            <RestrictedRoute show={props.isAuthenticated} component = { CreatePlace } path="/createPlace" />
            <RestrictedRoute show={props.isAuthenticated} component = { UpdatePlace } path="/updatePlace/:id" />
            <RestrictedRoute show={props.isAuthenticated} component = { ViewResponsibles } path="/viewResponsibles/:id" />
            


            <RestrictedRoute show={props.isAuthenticated} component = { ListSports } path="/listSports" />
            <RestrictedRoute show={props.isAuthenticated} component = { CreateSport } path="/createSport" />
            <RestrictedRoute show={props.isAuthenticated} component = { UpdateSport } path="/updateSport/:id" />


            <RestrictedRoute show={props.isAuthenticated} component = { ListScheduling } path="/listScheduling" />
            <RestrictedRoute show={props.isAuthenticated} component = { CreateScheduling } path="/createScheduling" />
            <RestrictedRoute show={props.isAuthenticated} component = { ViewPresent } path= "/viewPresent" />
            <RestrictedRoute show={props.isAuthenticated} component = { ViewParticipants } path= "/viewParticipants/:id" />
            <RestrictedRoute show={props.isAuthenticated} component = { ViewSchedulingPending } path= "/viewSchedulingPending" />
            <RestrictedRoute show={props.isAuthenticated} component = { UpdateSc } path= "/updateScheduling/:id" />


            <RestrictedRoute show={props.isAuthenticated} component = { ViewUser } path= "/viewUser" />
            <RestrictedRoute show={props.isAuthenticated} component = { UpdateUser } path= "/updateUser/:id" />
            <RestrictedRoute show={props.isAuthenticated} component = { calendario } path= "/Calendar" />
            

            </Switch>
        </BrowserRouter>
        
    );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
    <AuthConsumer>
        { (context) => (<AppRoutes isAuthenticated={context.isAuthenticated} />) }
    </AuthConsumer>
)