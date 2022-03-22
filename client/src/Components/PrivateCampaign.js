import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from '../utils/auth';

function PrivateCampaign({children, ...rest }) {

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

export default PrivateCampaign; 