import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CAMPAIGN } from "../utils/mutations";
import { QUERY_CAMPAIGN, QUERY_ME } from "../utils/queries";

const AddCampaign = ({handleClose}) => {
    const [userFormData, setUserFormData] = useState({
        campaignName: "",
        description: "",
        setting: "", 
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
        console.log(userFormData);
    };

    const [addCampaign, {error}] = useMutation(ADD_CAMPAIGN,{
        update(cache, { data: { addCampaign } }) {
          try {
            const {campaigns}  = cache.readQuery({ query: QUERY_CAMPAIGN });
            cache.writeQuery({
              query: QUERY_CAMPAIGN,
              data: { campaigns: [addCampaign, ...campaigns] }
            });
          } catch (err) {
            console.error(err);
          }
          const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, campaigns: [...me.campaigns, addCampaign] } }
        });
        }
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await addCampaign({
                variables: { ...userFormData }
            });
        } catch (err) {
            console.error(err);
        }

        setUserFormData({
            campaignName: "",
            description: "",
            setting: "",
        });
    };

    return (
        <>
            <form onSubmit={handleFormSubmit} className="object-center flex flex-col items-center text-slate-50  from-charcoal to-slate rounded-md p-4 w-full">
                <input
                    className='form-input m-2 text-lg font-cormorant font-bold rounded-md'
                    placeholder="Every campaign needs a name. What's yours?"
                    name='campaignName'
                    type='input'
                    id='campaignName'
                    value={userFormData.campaignName}
                    onChange={handleInputChange}
                />
                <textarea
                    className='form-input m-2 text-lg font-cormorant font-bold rounded-md'
                    placeholder='Tell us a little about your campaign.'
                    name='description'
                    type='text'
                    id='description'
                    value={userFormData.description}
                    onChange={handleInputChange}
                ></textarea>
                <input
                    className='form-input m-2 text-lg font-cormorant font-bold rounded-md'
                    placeholder='Where is your campaign starting?'
                    name='setting'
                    type='text'
                    id='setting'
                    value={userFormData.setting}
                    onChange={handleInputChange}
                />
                <button className='form-btn d-block w-50 m-5 text-lg text-slate font-macondo bg-turq/75' type='submit' onClick={handleClose}>
                    Submit
                </button>
            </form>
        </>
    )
};

export default AddCampaign;