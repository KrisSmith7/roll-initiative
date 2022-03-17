import React from "react";

function Campaigns ({ campaigns }){

        if (!campaigns.length) {
            return (
            <p>You are not a part of any campaigns. What are you waiting for?</p>
            )
        }
    
        return (
            <>
                {campaigns.map(campaign => {
                    return( 
                        <div>
                        <h1>{campaign.campaignName}</h1>
                        <h1>{campaign.description}</h1>
                        <h1>{campaign.setting}</h1>
                        </div>
                     
                    )
                })}
            </>
        )
    }

export default Campaigns;