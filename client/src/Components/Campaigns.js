import React from "react";
import { Link } from 'react-router-dom';
import { ADD_PLAYER } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import addIcon from "../assets/add.svg"

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

                    <div className="md:flex md:flex-col md:items-center w-full">
    <div className="w-full py-2 sm:px-6 lg:px-8">
      <div className="text-white flex justify-center">
        <table className="w-11/12 table-auto">
          <thead className="bg-charcoal text-white border-b">
            <tr>
              <th scope="col" aria-label="campaign-data" className="text-sm font-medium text-white px-6 py-4 text-left hidden">
                Request to Join
              </th>
              <th scope="col" aria-label="campaign-data" className="text-sm font-medium text-white px-6 py-4 text-left">
                Campaign Name
              </th>
              <th scope="col" aria-label="campaign-data" className="text-sm font-medium text-white px-6 py-4 text-left">
                Description
              </th>
              <th scope="col" aria-label="campaign-data" className="text-sm font-medium text-white px-6 py-4 text-left">
                Setting
              </th>
              <th scope="col" aria-label="campaign-data" className="text-sm font-medium text-white px-6 py-4 text-left">
                DM
              </th>
              <th scope="col" aria-label="campaign-data" className="text-sm font-medium text-white px-6 py-4 text-left">
                Players
              </th>
            </tr>
          </thead>
          <tbody>
                    {campaigns.map(campaign => {
                        return (
                            <tr key={campaign._id} className="bg-turq/25 text-white border-b">
              <td className="px-6 py-4 whitespace-nowrap font-medium hidden">
                  <button onClick={() => handleClick(campaign._id)}>
                      <img src={addIcon}/>
                      </button>
                  </td>
              <td className="font-light font-macondo md:px-6 md:py-4 whitespace-pre-wrap">
              <span className="pr-2 font-semibold md:hidden">Name:</span><Link to={`/campaign/${campaign._id}`}>
                  {campaign.campaignName}
                </Link>
              </td>
              <td className="font-light md:px-6 md:py-4 whitespace-pre-wrap">
              <span className="pr-2 font-semibold md:hidden">Description:</span><br className="md:hidden"/>{campaign.description}
              </td>
              <td className="font-light md:px-6 md:py-4 whitespace-nowrap">
              <span className="pr-2 font-semibold md:hidden">Setting:</span>{campaign.setting}
              </td>
              <td className="font-light md:px-6 md:py-4 whitespace-nowrap">
                <Link to={`/profile/${campaign.username}`}>
                <span className="pr-2 font-semibold md:hidden">DM:</span>{campaign.username ? `${campaign.username}` : 'you!' }
                </Link>
              </td>
              <td className="font-light md:px-6 md:py-4 whitespace-nowrap">
              <span className="pr-2 font-semibold md:hidden">Players:</span>{campaign.playerCount}
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
