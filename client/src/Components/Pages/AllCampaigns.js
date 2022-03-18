import {React, useState} from "react";
import { useQuery } from "@apollo/client";
import {QUERY_CAMPAIGN} from '../../utils/queries';
import { Modal, Nav, Tab } from 'react-bootstrap';
import Campaigns from "../Campaigns";
import Auth from "../../utils/auth";
import stockImg6 from "../../assets/stock_images/stock_image6.jpg";
import AddCampaign from "../AddCampaign";


function AllCampaigns () {

    const { data } = useQuery(QUERY_CAMPAIGN);
    console.log(data)
    const campaigns = data.campaigns || [];
    console.log("all campaigns page", campaigns);

    const loggedIn = Auth.loggedIn();

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (<>

        <div className="bg-slate relative overflow-hidden h-screen w-full">
        <img src={stockImg6} className="absolute h-full w-full object-cover opacity-50" alt="castle background" />
        <div className="inset-0 bg-gradient-to-r from-charcoal to-slate opacity-25 absolute">
        </div>
        <div className="flex items-center justify-center w-full h-full">
<div className="bg-turq/25 w-full h-1/2 z-10 flex items-center rounded-md">

{/* checks if loggedIn and displays campaigns list */}
<>
    {loggedIn && (
        <div className="bg-gray-900/25 w-full h-3/4 flex items-center p-2">
            <Campaigns campaigns={campaigns} />
            <button onClick={handleShow}>Start your own -- Become a DM</button>
        </div>
    )}
    </>

    </div>
    </div>
</div>

<div className='modal-container h-screen'>
            <Modal                size="lg"
                centered
                show={showModal}
                onHide={handleClose}
                ClassName="modal"
            >
<AddCampaign/>
                
                </Modal>
                </div>

</>
    )
};


export default AllCampaigns;