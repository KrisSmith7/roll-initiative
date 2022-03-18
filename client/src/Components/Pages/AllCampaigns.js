import {React, useMutation} from "react";
import { useQuery } from "@apollo/client";
import {QUERY_CAMPAIGN} from '../../utils/queries'
import Campaigns from "../Campaigns";
import Auth from "../../utils/auth";


function AllCampaigns ({}) {

    const { loading, data } = useQuery(QUERY_CAMPAIGN);
    const campaigns = data?.campaigns || [];
    console.log("all campaigns page", campaigns);

    const loggedIn = Auth.loggedIn();

    return (

<>
    {loggedIn && (
        <div>
            <Campaigns campaigns={campaigns} />
        </div>
    )}
    </>
    // {loading ? (
    //     <div>Loading...</div>
    // ) : (
    //     <PostList posts={posts} title="Some talk from the Tavern" />
    // )}
    )
};


export default AllCampaigns;