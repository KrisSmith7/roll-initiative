import React, { Children } from "react";
import { Route, Redirect, useParams } from "react-router-dom";
import Auth from '../utils/auth';

function PrivateProfile({ children, ...rest }) {

    const { username: username } = useParams(); 

    if (username) {
        return (
            <Route {...rest} 
            render={() => { 
                return children
            }} />
        )
    }

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

export default PrivateProfile;


