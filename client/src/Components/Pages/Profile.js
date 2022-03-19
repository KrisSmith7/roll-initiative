import { React, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import Characters from "../Characters";
import Campaigns from "../Campaigns";
import AddCharacter from '../AddCharacter'; 
import { Modal } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_USER } from '../../utils/queries';
import Auth from '../../utils/auth'; 

function Profile ({currentPage, handlePageChange}){

    const { username: userParam } = useParams(); 

    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam }
    }); 

    const user = data?.me || data?.user || {}; 

    let isMe; 

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam || !userParam ) {
        isMe = true; 
        // unnecessary to redirect to /profile with our functionality 
        // return <Redirect to="/profile" />; 
      }

    if (loading) {
        return ( 
            <div> Loading... </div>
        )
    }

    

    return (
        <div>
            {isMe && 
            <>
            <button onClick={handleShow}>Create a character!</button>
            {/* <div className='modal-container h-screen'> */}
            <Modal                size="lg"
                centered
                show={showModal}
                onHide={handleClose}
                ClassName="modal"
            >
                <AddCharacter />
                
                </Modal>
                {/* </div> */}
                </>}
            <Characters characters={user.characters} isMe={isMe} />
            <Campaigns campaigns={user.campaigns} />
        </div>
    )
}

export default Profile;