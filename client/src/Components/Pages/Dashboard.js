import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../../utils/queries';
import stockImg from '../../assets/stock_images/stock_image0.jpg';
import parchment from '../../assets/stock_images/parchment.jpg';
import PostList from "../PostList";
import PostForm from '../PostForm';
import Auth from '../../utils/auth';

function Dashboard() {

    const { loading, data } = useQuery(QUERY_POSTS);
    const posts = data?.posts || [];
    console.log("dashboard posts", posts);

    const loggedIn = Auth.loggedIn();

    return (
        <div className="bg-slate relative h-full w-full">
            <img src={stockImg} className="absolute h-full w-full object-cover opacity-75" alt="ye old tavern"/>
            <div className="inset-0 bg-gradient-to-l from-charcoal absolute">
            </div>
            <div className="mx-auto px-6 md:px-12 relative z-10 flex items-start py-4 xl:py-40">
                <div className="w-full flex flex-col items-center relative z-10">
                    <h1 className="font-bold text-4xl text-center p-4 rounded-lg lg:text-7xl text-white leading-tight">
                        Tavern Talk
                    </h1>
                    
                    <div className="modal-content rounded-md text-lg text-white mt-10 w-full">
                        <div className="overflow-auto inset-0 bg-gradient-to-b from-charcoal/[.35] rounded-md p-4 ">
                           <h1 className="font-antiqua text-center pb-4 text-2xl lg:text-4xl border-b-2 border-sienna">
                               Gather 'round, grab an ale, and share your tales!
                               </h1> 
                        {/* </div> */}


                        {/* forum/discussion post element   */}
                        <div className="tracking-wider text-md p-4 lg:text-xl lg:p-8">
                            {loggedIn && (
                                <div>
                                    <PostForm />
                                </div>
                            )}
                            {/* <article className="bg-gradient-to-r from-charcoal to-slate p-4 rounded-b-md ">

                                <div className="bg-gray-800 rounded-md p-4">

                                    <div className="whitespace-pre-wrap font-cormorant">
                                        Cleric: You need to lie still. You’ve lost a lot of blood. <br />
                                        Barbarian: I didn’t lose it. I know exactly where it is *Points to puddle of blood*
                                    </div>

                                </div>
                                <div className="py-4 font-cormorant">
                                            Posted by: examplepost   
                                </div>
                            </article> */}
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


    )
}

export default Dashboard;