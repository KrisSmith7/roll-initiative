import React, { useState } from "react";
import { Modal } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../../utils/queries';
import stockImg from '../../assets/stock_images/stock_image0.jpg';
import PostList from "../PostList";
import PostForm from '../PostForm';
import Auth from '../../utils/auth';
import SiteTitle from "../SiteTitle";

function Dashboard() {

    const { loading, data } = useQuery(QUERY_POSTS);
    const posts = data?.posts || [];
    //console.log("dashboard posts", posts);

    const loggedIn = Auth.loggedIn();

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <div className="h-screen">
            <div className="h-1/2">
        <SiteTitle/>
            </div>
        <div className="bg-sienna pt-12 lg:pt-24">
        <div className="bg-slate relative h-full w-full lg:border-t-4 ">
            <img src={stockImg} className="absolute h-full w-full object-cover opacity-75" alt="ye old tavern"/>
            <div className="inset-0 bg-gradient-to-l from-charcoal absolute">
            </div>
            <div className="mx-auto px-6 md:px-12 relative  flex items-start py-4 xl:py-40">
                <div className="w-full flex flex-col items-center relative">
                    <h1 className="font-bold text-4xl text-center p-4 rounded-lg lg:text-7xl text-white leading-tight">
                        Tavern Talk
                    </h1>
                    
                    <div className="modal-content rounded-md text-lg text-white w-full lg:2/3 mt-8">
                        <div className="overflow-auto inset-0 bg-gradient-to-b from-charcoal/[.35] rounded-md p-8 ">
                           <h1 className="font-antiqua text-center text-sienna pb-4 text-2xl lg:text-4xl border-b-2 border-sienna">
                               Gather 'round, grab an ale, and share your tales!
                               </h1> 

                        {/* forum/discussion post element   */}
                        <div className="tracking-wider text-md lg:text-xl lg:p-4">
                            {loggedIn && (
                                <div className="flex justify-center">
                                    <button onClick={handleShow} className='form-btn d-block w-50 m-5 text-lg text-slate font-macondo bg-turq/75'>Create New Post</button>
                                    <Modal
                                        size="lg"
                                        centered
                                        show={showModal}
                                        onHide={handleClose}
                                        ClassName="modal"
                                    >
                                        <PostForm handleClose={handleClose}/>
                                    </Modal>
                                    
                                </div>
                            )}
                            {loading ? (
                                <div>Loading...</div>
                            ) : (
                                <PostList posts={posts} title="Some talk from the Tavern" />
                            )}
                            
                        </div>
                        {/* end of user post container */}
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
</div>

    )
}

export default Dashboard;