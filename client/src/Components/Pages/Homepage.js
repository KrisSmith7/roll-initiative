import React from "react";
import stockImg1 from "../../assets/stock_images/stock_image3.jpg"

function Homepage (){

    return (
    <section className="bg-slate">
       
<div className="h-full w-full">

            <div className="w-full h-3/4">
                
                    <img src={stockImg1} alt="hero-image"
                    className="opacity-75 object-contain" />
                    <div className="border-charcoal border-y-2 p-4 bg-slate/75 relative bottom-64">
                    <h1 className="text-center text-4xl">Social Rolls</h1>
                    </div>
            </div>

</div>

                    



    </section>
    )
}

export default Homepage;