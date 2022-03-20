import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const SignUpForm = () => {
    const [userFormData, setUserFormData] = useState({
        username: "",
        email: "", 
        password: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
        console.log(userFormData);
    };

    const [addUser] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addUser({
                variables: { ...userFormData }
            });
            Auth.login(data.addUser.token);
        } catch (err) {
            console.error(err);
        }

        setUserFormData({
            username: "",
            email: "",
            password: "",
        });
    };

    return (
        <>
            <form onSubmit={handleFormSubmit} className="object-center flex flex-col items-center text-slate-50  from-charcoal to-slate rounded-md p-4 w-full">
                <input
                    className='form-input m-2 text-lg font-cormorant font-bold rounded-md'
                    placeholder='username'
                    name='username'
                    type='username'
                    id='username'
                    value={userFormData.username}
                    onChange={handleInputChange}
                />
                <input
                    className='form-input m-2 text-lg font-cormorant font-bold rounded-md'
                    placeholder='email'
                    name='email'
                    type='email'
                    id='email'
                    value={userFormData.email}
                    onChange={handleInputChange}
                />
                <input
                    className='form-input m-2 text-lg font-cormorant font-bold rounded-md'
                    placeholder='password'
                    name='password'
                    type='password'
                    id='password'
                    value={userFormData.password}
                    onChange={handleInputChange}
                />
                <button className='form-btn d-block w-50 m-5 text-lg text-slate font-macondo bg-turq/75' type='submit'>
                    Submit
                </button>
            </form>
        </>
    )
};

export default SignUpForm;