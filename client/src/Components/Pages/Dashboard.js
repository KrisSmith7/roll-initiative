import React from "react";
import stockImg from '../../assets/stock_images/stock_image0.jpg'

function Dashboard() {

    return (
        <div className="flex-initial w-5/6 bg-slate relative overflow-hidden h-screen">
            <img src={stockImg} className="absolute h-full w-full object-cover opacity-75" alt="ye old tavern"/>
            <div className="inset-0 bg-gradient-to-l from-charcoal absolute">
            </div>
            <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-start py-4 xl:py-40">
                <div className="w-full flex flex-col items-center relative z-10">
                    <h1 className="font-bold text-4xl text-center p-4 rounded-lg lg:text-7xl text-white leading-tight">
                        Tavern Talk
                    </h1>
                    <div className="container bg-turq/75 rounded-md text-lg text-white mt-10 w-full">
                        <div className="p-4 font-antiqua text-center text-slate text-2xl lg:text-4xl">
                            Gather 'round, grab an ale, and share your tales!
                        </div>


                        {/* forum/discussion post element   */}
                        <div className="container tracking-wider text-md lg:text-xl lg:p-8">
                            <article className="bg-gradient-to-r from-charcoal to-slate p-4 rounded-b-md ">

                                <div className="bg-gray-800 rounded-md p-4">

                                    <div className="whitespace-pre-wrap font-cormorant">
                                        Cleric: You need to lie still. You’ve lost a lot of blood. <br />
                                        Barbarian: I didn’t lose it. I know exactly where it is *Points to puddle of blood*
                                    </div>

                                </div>
                                <div className="py-4 font-cormorant">
                                            Posted by: examplepost   
                                </div>
                            </article>
                        </div>
                        {/* end of user post container */}

                    </div>
                </div>
            </div>
        </div>


    )
}

export default Dashboard;