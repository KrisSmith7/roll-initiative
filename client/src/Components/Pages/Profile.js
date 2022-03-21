import { React, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import Characters from "../Characters";
import Campaigns from "../Campaigns";
import PostList from "../PostList";
import AddCharacter from '../AddCharacter'; 
import PostForm from '../PostForm';
import { Modal, Tab, Nav } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_USER } from '../../utils/queries';
import Auth from '../../utils/auth'; 
import Die from "../../assets/socialrolls_logo.png";
// import EditProfile from "../EditProfile";

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

    const [showPostModal, setShowPostModal] = useState(false);
    const handlePostClose = () => setShowPostModal(false);
    const handlePostShow = () => setShowPostModal(true);

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
                <div className=" flex justify-evenly user-profile mt-3 bg-gradient-to-b from-charcoal/[.35] items-center">
                    <div className="flex-auto rounded-full w-20 p-3">
                        <img className="p-4" src={Die} alt="profile-img"></img>
                    </div>
                    
                    <div className="flex-auto w-80"> 
                        <h2 className="text-5xl text-slate font-antiqua"> {user.username ? `${user.username}'s` : 'your'} profile </h2>
                        {/* <button className='w-50 text-slate bg-turq/75 rounded-md mt-5' onClick={handleEdit}> ✏️ Edit Profile</button> */}
                    </div>
                    {/* <Modal 
                        size="lg"
                        centered
                        show={showEdit}
                        onHide={handleCloseEdit}
                        ClassName="modal"
                    >
                        <EditProfile handleCloseEdit={handleCloseEdit}/>
                    </Modal> */}
                </div>
                
                <Tab.Container defaultActiveKey="characters" className="flex justify-evenly w-75">
                    <Nav variant="tabs">
                        <Nav.Item className='nav-tab'>
                            <Nav.Link  className="font-antiqua nav-a text-3xl" eventKey="characters">My Characters</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='nav-tab'>
                            <Nav.Link  className="font-antiqua nav-a text-3xl" eventKey="campaigns">My Campaigns</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='nav-tab'>
                            <Nav.Link className="font-antiqua nav-a text-3xl" eventKey="posts">My Posts</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content className="p-4">
                        <Tab.Pane eventKey="characters" title="My Characters" className="">
                            {/* <h2 className="text-3xl text-slate font-antiqua">My Characters</h2> */}
                            {user.username && 
                            <>
                                <div className="flex justify-center">
                                    <button className='text-white bg-sienna/75 p-2 m-2 rounded-md' onClick={handleShow}>Create a character!</button>
                                </div>
                                
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
                                <div className="m-2 flex flex-wrap justify-center"> 
                                    <Characters characters={user.characters} />
                                </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="campaigns" title="My Campaigns" className="flex flex-col items-center bg-sienna md:py-4 md:px-4">
                            {/* <h2 className="text-3xl text-slate font-antiqua">My Campaigns</h2> */}
                            <Campaigns campaigns={user.campaigns} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="posts" title="My Posts" className="flex flex-col items-center bg-sienna/50">
                            {user.username &&
                            <>
                                <div className="flex justify-center">
                                    <button className='text-white bg-sienna/75 p-2 m-2 rounded-md' onClick={handlePostShow}>Add a new post!</button>
                                </div>
                                <Modal
                                    size="lg"
                                    centered
                                    show={showPostModal}
                                    onHide={handlePostClose}
                                    className="modal"
                                >
                                    <PostForm handleClose={handlePostClose} />
                                </Modal>
                            </>}
                            <div className="m-2 flex flex-wrap justify-center">
                                <PostList posts={user.posts} />
                            </div>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
       </div>
        
        
    )
}

export default Profile;