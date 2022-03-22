import React from "react";
import stockImg11 from "../assets/stock_images/stock_image11.jpg"

function Homepage() {

    return (
        <div className="bg-slate relative h-full border-b-4">
            <img src={stockImg11} className="absolute h-full w-full object-cover opacity-50" alt="DnD gameplay" />
            <div className="inset-0 bg-gradient-to-r from-charcoal to-slate opacity-50 absolute">
            </div>
            <div className="px-6 h-full z-10 flex justify-center items-center">
                <div className="w-full flex flex-col items-center justify-center z-10">
                    <h1 className="font-extrabold text-7xl text-center p-4 rounded-lg sm:text-8xl text-white leading-tight">
                        Social Rolls
                    </h1>
                    <span className="block bg-sienna py-3 px-4 text-lg text-center text-white font-bold uppercase my-10">
                        A social network for fans of Dungeons and Dragons
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Homepage;