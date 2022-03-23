import React, { useState } from 'react';
import { useParams, Link, Redirect } from 'react-router-dom';
import stockImg6 from "../../assets/stock_images/stock_image6.jpg";

import Auth from '../../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_CAMPAIGN, QUERY_CAMPAIGNS } from '../../utils/queries';
import { ADD_PLAYER, DELETE_CAMPAIGN } from '../../utils/mutations';

const SingleCampaign = () => {
  const { id: campaignId } = useParams();
  console.log(campaignId);
  const [addPlayer] = useMutation(ADD_PLAYER);
  const [deleteCampaign, { error }] = useMutation(DELETE_CAMPAIGN, {
    update(cache, { data: { deleteCampaign } }) {
      try {
        const { campaigns } = cache.readQuery({ query: QUERY_CAMPAIGNS });
        cache.writeQuery({
          query: QUERY_CAMPAIGNS,
          data: { campaigns: [...campaigns].filter((campaign) => campaign._id !== deleteCampaign._id) }
        });
      } catch (err) {
        console.error(err);
      }
    }
  });


  const { loading, data } = useQuery(QUERY_CAMPAIGN, {
    variables: { id: campaignId }
  });

  const campaign = data?.campaign || {};
  console.log("page load campaign: ", campaign);

  

  const [idRedirect, setRedirect] = useState(false);

  const handleDeleteCampaign = async (campaignId) => {
    console.log("delete button clicked", campaignId);
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      console.log("You are not logged in");
      return false;
    }

    try {
      await deleteCampaign({
        variables: { campaignId: campaignId }
      });

      console.log("deletedCampaign: ", campaignId);
      setRedirect(true);
    } catch (err) {
      console.error(err);
    }
  }

  const handleClick = async (campaignId) => {
    console.log("handleClick: ", campaignId);
    try {
      await addPlayer({
        variables: { campaignId: campaignId }
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative h-full w-full">
      <img src={stockImg6} className="absolute h-full w-full object-cover z-[-100] brightness-50" alt="castle background" />
      <div className='flex justify-center'>
        <Link to="/campaigns" className="form-btn font-bold mt-5 bg-turq/25 text-white"> ← Back to All Campaigns </Link>
      </div>
      <div class="md:flex md:flex-col md:items-center w-full">
        <div class="w-full py-2 sm:px-6 lg:px-8">
          <div class="text-white">
            <table class="w-full table-auto">
              <thead class="bg-charcoal text-white border-b">
                <tr>
                  <th scope="col" aria-label="campaign-data" class="text-sm font-medium text-white px-6 py-4 text-left">
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
              { idRedirect ? (<Redirect push to="/campaigns" />) : null }
              <tbody>
                <tr class="bg-turq/25 text-white border-b">
              <td class="px-6 py-4 whitespace-nowrap font-medium">
                  <button onClick={() => handleClick(campaign._id)}>+</button>
                  </td>
              <td class="font-light font-macondo md:px-6 md:py-4 whitespace-nowrap">
                {campaign.campaignName}
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
              </tbody>
            </table>
            {campaign.players.length > 0 &&
            <table class="w-full table-auto">
              <thead class="bg-charcoal text-white border-b">
                <tr>
                  <th scope="col" aria-label="player-data" class="text-sm font-medium text-white px-6 py-4 text-center">
                    Player Username
                  </th>
                  <th scope="col" aria-label="player-data" class="text-sm font-medium text-white px-6 py-4 text-center">
                    Player Character Count
                  </th>
                </tr>
              </thead>
              
              <tbody>
                {campaign.players.map(player => {
                  return (
                    <tr key={player._id} class="bg-turq/25 text-white border-b">
                      <td class="px-6 py-4 whitespace-nowrap font-medium text-center">
                        <Link to={`/profile/${player.username}`}>
                          {player.username}
                        </Link>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap font-medium text-center">
                        {player.characterCount}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            }
            <div className='flex justify-center'>
              <button type='button' onClick={() => handleDeleteCampaign(campaign._id)} className='m-2 form-btn d-block w-30 text-lg bg-turq/25 text-white font-macondo'  >Delete Campaign</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCampaign;