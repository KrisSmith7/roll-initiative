import React from "react";

function Campaigns ({ campaigns }){

        if (!campaigns.length) {
            return (
            <div className="w-full flex flex-col items-center justify-center">
            <h1 className="text-4xl text-center tracking-normal py-2">You are not a part of any campaigns. 
                </h1>
            <p className="text-2xl font-unicase">
                What are you waiting for?
                </p>
            
            </div>
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