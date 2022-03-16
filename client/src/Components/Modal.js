import React, { useState } from 'react';
import SignUpForm from './Pages/SignUpForm';
import LoginForm from './Pages/LoginForm';

const Modal = () => {
    //const [showSignUp, setShowSignUp] = useState(true);


    return (
        <div id="modal" className="container grid place-items-center h-screen bg-turq/75 rounded-md text-lg text-white m-10 w-full">
            <div className="container tracking-wider w-5/6 text-md lg:text-xl lg:p-8 ">
                <article className="bg-gradient-to-r from-charcoal to-slate p-4 rounded-b-md ">

                    <div className="bg-gray-800 rounded-md p-4">

                        <div className="whitespace-pre-wrap">
                            <SignUpForm />
                        </div>

                    </div>
                    <button className="p-4 font-semibold">
                        Login
                    </button>
                    <button className="py-4 font-semibold">
                        Sign Up
                    </button>
                </article>
            </div>
        </div>
    )
};

export default Modal;