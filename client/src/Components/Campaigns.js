import React from "react";
import { Link } from 'react-router-dom';
import { ADD_PLAYER } from '../utils/mutations';
import { useMutation } from '@apollo/client';

function Campaigns({ campaigns }) {
  const [addPlayer] = useMutation(ADD_PLAYER);
  if (!campaigns.length) {
    return (
      <div className="bg-gray-900/25 w-full h-3/4 flex flex-col justify-center p-2">
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-4xl text-center tracking-normal py-2">
            You are not a part of any campaigns.
          </h1>
          <p className="text-2xl font-unicase">What are you waiting for?</p>
        </div>
      </div>
    );
  }

  

  const handleClick = async (campaignId) => {
    //console.log("handleClick: ", campaignId);
    try {
      await addPlayer({
        variables: { campaignId: campaignId }
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (

                    <div class="md:flex md:flex-col md:items-center w-full">
    <div class="w-full py-2 sm:px-6 lg:px-8">
      <div class="text-white flex justify-center">
        <table class="w-11/12 table-auto">
          <thead class="bg-charcoal text-white border-b">
            <tr>
              <th scope="col" aria-label="campaign-data" class="text-sm font-medium text-white px-6 py-4 text-left hidden">
                Request to Join
              </th>
              <th scope="col" aria-label="campaign-data" class="text-sm font-medium text-white px-6 py-4 text-left">
                Campaign Name
              </th>
              <th scope="col" aria-label="campaign-data" class="text-sm font-medium text-white px-6 py-4 text-left">
                Description
              </th>
              <th scope="col" aria-label="campaign-data" class="text-sm font-medium text-white px-6 py-4 text-left">
                Setting
              </th>
              <th scope="col" aria-label="campaign-data" class="text-sm font-medium text-white px-6 py-4 text-left">
                DM
              </th>
              <th scope="col" aria-label="campaign-data" class="text-sm font-medium text-white px-6 py-4 text-left">
                Players
              </th>
            </tr>
          </thead>
          <tbody>
                    {campaigns.map(campaign => {
                        return (
                            <tr key={campaign._id} class="bg-turq/25 text-white border-b">
              <td class="px-6 py-4 whitespace-nowrap font-medium hidden">
                  <button onClick={() => handleClick(campaign._id)}>+</button>
                  </td>
              <td class="font-light font-macondo md:px-6 md:py-4 whitespace-pre-wrap">
                <Link to={`/campaign/${campaign._id}`}>
                  {campaign.campaignName}
                </Link>
              </td>
              <td class="font-light md:px-6 md:py-4 whitespace-pre-wrap">
                {campaign.description}
              </td>
              <td class="font-light md:px-6 md:py-4 whitespace-nowrap">
                {campaign.setting}
              </td>
              <td class="font-light md:px-6 md:py-4 whitespace-nowrap">
                <Link to={`/profile/${campaign.username}`}>
                <span className="pr-2 font-semibold md:hidden">DM:</span>{campaign.username ? `${campaign.username}` : 'you!' }
                </Link>
              </td>
              <td class="font-light md:px-6 md:py-4 whitespace-nowrap">
                {campaign.playerCount}
              </td>
            </tr>
                        )
                    })}
  </tbody>
        </table>
      </div>
    </div>
  </div>
  );
}

export default Campaigns;
