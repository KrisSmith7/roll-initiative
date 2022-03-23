import React from "react";
import stockImg11 from "../assets/stock_images/stock_image11.jpg"

function Homepage() {

    return (
        <div className="h-full relative h-full border-b-4">
            <img src={stockImg11} className="absolute h-full w-full object-cover" alt="DnD gameplay" />
            <div className="inset-0 bg-gradient-to-r from-charcoal to-slate opacity-50 absolute">
            </div>
            <div className="px-6 h-full z-10 flex justify-center items-center">
                <div className="w-full flex flex-col items-center justify-center z-10 mt-10 md:my-10 p-2">
                    <h1 className="font-extrabold text-7xl md:text-8xl text-center rounded-lg lg:text-9xl text-white leading-none">
                        Social Rolls
                    </h1>
                    <span className="block bg-sienna text-xl lg:text-4xl text-center text-white font-bold uppercase my-2 py-1 px-2">
                        A social network for fans of Dungeons and Dragons
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Homepage;