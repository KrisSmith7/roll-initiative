import React from "react";
import Characters from "../Characters";
import Campaigns from "../Campaigns";
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries'

function Profile ({currentPage, handlePageChange}){

    const { loading, data } = useQuery(QUERY_ME); 

    const user = data?.me || {}; 

    if (loading) {
        return ( 
            <div> Loading... </div>
        )
    }
    console.log(user); 

    return (
        <div>
            <Characters characters={user.characters}
                currentPage={currentPage}
                handlePageChange={handlePageChange}/>
            <Campaigns campaigns={user.campaigns} />
        </div>
    )
}

export default Profile;