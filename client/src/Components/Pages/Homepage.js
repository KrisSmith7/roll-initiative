import React from "react";
import stockImg11 from "../../assets/stock_images/stock_image11.jpg"

function Homepage() {

    return (
        <div class="bg-slate relative overflow-hidden h-screen">
            <img src={stockImg11} class="absolute h-full w-full object-cover opacity-50" />
            <div class="inset-0 bg-gradient-to-r from-charcoal to-slate opacity-50 absolute">
            </div>
            <div class="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
                <div class="w-full flex flex-col items-center relative z-10">
                    <h1 class="font-extrabold text-7xl text-center p-4 rounded-lg sm:text-8xl text-white leading-tight mt-4">
                        Social Rolls
                    </h1>
                    <span class="block bg-sienna py-3 px-4 text-lg text-white font-bold uppercase mt-10">
                        We cam add a tagline/description here.
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Homepage;