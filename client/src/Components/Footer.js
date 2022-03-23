import React from "react";
import logo from "../assets/socialrolls_logo.png";


function Footer (){

    return (
        <div>
            <div className="push"></div>
            
            <footer className=" flex justify-center items-center bg-charcoal w-full font-antiqua text-center text-white p-3" style={{zIndex:1}}> <img src={logo} className=" roll-in h-8 mr-5" alt="20-sided die" /> Social Rolls </footer>
        </div> 
        
    )
}

export default Footer;