import { React, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import Characters from "../Characters";
import Campaigns from "../Campaigns";
import AddCharacter from '../AddCharacter'; 
import { Modal } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_USER } from '../../utils/queries';
import Auth from '../../utils/auth'; 
import Die from "../../assets/socialrolls_logo.png"

function Profile (props){

    const { username: userParam } = useParams(); 

    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam }
    }); 

    const user = data?.me || data?.user || {}; 

    // let isMe; 

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam ) {
        // isMe = true; 
        // unnecessary to redirect to /profile with our functionality 
        return <Redirect to="/profile" />; 
      }

    if (loading) {
        return ( 
            <div> Loading... </div>
        )
    }    

    return (
       <div className="flex justify-center">
           <div className="w-4/5">
                <div className=" flex justify-center user-profile mt-3 bg-gradient-to-b from-charcoal/[.35] items-center">
                    <img className="rounded-full w-60 p-3" src={Die} alt="profile-img"></img>
                    <div> 
                        <h2 className="text-5xl text-slate font-antiqua"> {user.username ? `${user.username}'s` : 'your'} profile </h2>
                        <button className='w-50 text-slate bg-turq/75 rounded-md mt-5'> ✏️ Edit Profile</button>
                    </div>
                    
                </div>
                
                <div className="flex justify-center">
                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl text-slate font-antiqua">My Characters</h2>
                        {user.username && 
                        <>
                        <button className='text-white bg-sienna/75 p-2 m-2 rounded-md' onClick={handleShow}>Create a character!</button>
                        {/* <div className='modal-container h-screen'> */}
                        <Modal                
                            size="lg"
                            centered
                            show={showModal}
                            onHide={handleClose}
                            ClassName="modal"
                        >
                            <AddCharacter />
                            
                            </Modal>
                            {/* </div> */}
                            </>}
                        <Characters characters={user.characters} />
                    </div>
                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl text-slate font-antiqua">My Campaigns</h2>
                        <Campaigns campaigns={user.campaigns} />
                    </div> 
                </div>
            </div>
       </div>
        
        
    )
}

export default Profile;