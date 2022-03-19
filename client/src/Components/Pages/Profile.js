import React from "react";
import { Redirect, useParams } from "react-router-dom";
import Characters from "../Characters";
import Campaigns from "../Campaigns";
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_USER } from '../../utils/queries';
import Auth from '../../utils/auth'; 

function Profile ({currentPage, handlePageChange}){

    const { username: userParam } = useParams(); 

    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam }
    }); 

    const user = data?.me || data?.user || {}; 

    console.log(user);

    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Redirect to="/profile" />; 
      }


    if (loading) {
        return ( 
            <div> Loading... </div>
        )
    }

    if (!user?.username) {
        return ( 
            <h3> 
                Must be logged in to see characters and campaigns!
            </h3>
        )
    }
    console.log(user); 

    return (
        <div>
            <Characters characters={user.characters} />
            <Campaigns campaigns={user.campaigns} />
        </div>
    )
}

export default Profile;