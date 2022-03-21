import React from "react";

function Campaigns({ campaigns }) {
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

  return (

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
            </tr>
          </thead>
          <tbody>
                    {campaigns.map(campaign => {
                        return (
                            <tr class="bg-turq/25 text-white border-b">
              <td class="md:px-6 md:py-4 whitespace-nowrap font-medium">
                 <button>+</button>
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
                <span className="pr-2 font-semibold md:hidden">DM:</span>{campaign.username ? `${campaign.username}` : 'you!'}
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
