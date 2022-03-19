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

                    <div class="flex flex-col w-full">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div class="overflow-x-auto text-white">
        <table class="min-w-full">
          <thead class="bg-charcoal text-white border-b">
            <tr>
              <th scope="col" class="text-sm font-medium text-white px-6 py-4 text-left">
                Request to Join
              </th>
              <th scope="col" class="text-sm font-medium text-white px-6 py-4 text-left">
                Campaign Name
              </th>
              <th scope="col" class="text-sm font-medium text-white px-6 py-4 text-left">
                Description
              </th>
              <th scope="col" class="text-sm font-medium text-white px-6 py-4 text-left">
                Setting
              </th>
              <th scope="col" class="text-sm font-medium text-white px-6 py-4 text-left">
                DM
              </th>
            </tr>
          </thead>
          <tbody>
                    {campaigns.map(campaign => {
                        return (
                            <tr class="bg-turq/25 text-white border-b">
              <td class="px-6 py-4 whitespace-nowrap font-medium">
                  +
                  </td>
              <td class="font-light font-macondo px-6 py-4 whitespace-nowrap">
                {campaign.campaignName}
              </td>
              <td class="font-light px-6 py-4 whitespace-nowrap">
                {campaign.description}
              </td>
              <td class="font-light px-6 py-4 whitespace-nowrap">
                {campaign.setting}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {campaign.username}
              </td>
            </tr>
                        )
                    })}
  </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
    )
}

export default Campaigns;

        