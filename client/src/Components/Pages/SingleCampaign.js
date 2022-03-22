import React, { useState } from 'react';
import { useParams, Link, Redirect } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

import Auth from '../../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_CAMPAIGN, QUERY_CAMPAIGNS } from '../../utils/queries';
import { DELETE_CAMPAIGN } from '../../utils/mutations';
import { ADD_PLAYER } from '../../utils/mutations';

const SingleCampaign = () => {
  const { id: campaignId } = useParams();
  console.log(campaignId);
  const [addPlayer] = useMutation(ADD_PLAYER);

  const { loading, data } = useQuery(QUERY_CAMPAIGN, {
    variables: { id: campaignId }
  });

  const campaign = data?.campaign || {};
  console.log("page load campaign: ", campaign);

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
        varaiables: { campaignId: campaignId }
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
    <div>
      <div>
        <Link to="/Dashboard" className="text-slate font-bold mt-5"> ← Back to Dashboard </Link>
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
              { idRedirect ? (<Redirect push to="/" />) : null }
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
            <div>
              <button type='button' onClick={() => handleDeleteCampaign(campaign._id)} className='m-2 form-btn d-block w-30 text-lg text-slate font-macondo bg-turq/75'  >Delete Campaign</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCampaign;