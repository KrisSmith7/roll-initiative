import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from '../utils/auth';

function PrivateCampaigns({children, ...rest }) {

    return(
        <Route {...rest}
        render={() => {
            return Auth.loggedIn() === true ? (
              children
            ) : (
            <Redirect to="/login" /> )
        }} />
    )
}

export default PrivateCampaigns; 