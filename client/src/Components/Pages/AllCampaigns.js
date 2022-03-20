import { React, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CAMPAIGN } from '../../utils/queries';
import { Modal } from 'react-bootstrap';
import Campaigns from "../Campaigns";
import Auth from "../../utils/auth";
import stockImg6 from "../../assets/stock_images/stock_image6.jpg";
import AddCampaign from "../AddCampaign";
import knight from "../../assets/stock_images/knight.png"


function AllCampaigns() {

    const { loading, data } = useQuery(QUERY_CAMPAIGN);
    console.log(data)
    const campaigns = data?.campaigns || [];
    console.log("all campaigns page", campaigns);

    const loggedIn = Auth.loggedIn();

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    if (loading) {
        return (
            <div>
                <div class="bg-slate h-screen flex justify-center items-center">
                    <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }

    if(!loggedIn) {
        return (
            <div>
                <div class="bg-slate h-screen flex flex-col lg:flex-row justify-center items-center">
                        <img src={knight} alt='knight'/>
                        <p className="text-4xl">You must log in first!</p>
                    </div>
                </div>
        )
    }
    return (
    <>
        {/* checks if loggedIn and displays campaigns list */}
        {loggedIn && (

        <div className="bg-slate relative h-full w-full">
            <img src={stockImg6} className="absolute h-full w-full object-cover opacity-50" alt="castle background" />
            <div className="inset-0 bg-gradient-to-r from-charcoal to-slate opacity-25 absolute">
            </div>
            <div className="flex justify-center w-full h-full">

                    <div className="h-full z-10 py-8 flex flex-col items-center">
                        <div className="h-48 p-6 flex items-center">
                            <h1 className="text-4xl text-center">
                                Maybe you'll find what you're looking for here?
                            </h1>
                        </div>
                        <div className="overflow-auto h-3/4 w-screen my-8">
                            <Campaigns campaigns={campaigns} />
                        </div>
                        <div className="w-full h-48 py-2 border-t flex items-center sm:px-6 lg:px-8">
                            <button onClick={handleShow} className="w-full py-4 bg-turq/50 border-4 border-charcoal text-charcoal rounded-lg hover:bg-charcoal hover:text-turq hover:border-turq">
                                <span className="text-xl lg:text-4xl font-bold font-unicase">
                                    Start your own -- Become a DM
                                </span>
                            </button>
                        </div>
                    </div>


            </div>
        </div>
                )}

        <div className='modal-container'>
            <Modal size="lg"
                centered
                show={showModal}
                onHide={handleClose}
                ClassName="modal"
            >
                <AddCampaign />

            </Modal>
        </div>

    </>
    )
};


export default AllCampaigns;