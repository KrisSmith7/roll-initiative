import React from "react";

function Campaigns({ campaigns }) {

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
            <div>
                <table className="w-full">
                    <thead>
                        <td>
                            Name
                        </td>
                        <td>
                            Description
                        </td>
                        <td>
                            Setting
                        </td>
                        <td>
                            DM
                        </td>
                    </thead>
                    {campaigns.map(campaign => {
                        return (
                            <tr>
                                <td>
                                    <p className="font-macondo capitalize">{campaign.campaignName}</p>

                                </td>
                                <td>
                                    <p className="lowercase">{campaign.description}</p>

                                </td>
                                <td>
                                    <p className="lowercase">{campaign.setting}</p>

                                </td>
                                <td>
                                    <p className="lowercase">{campaign.username}</p>
                                </td>
                            </tr>

                        )
                    })}
                </table>
            </div>

        </>
    )
}

export default Campaigns;