import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from "../utils/auth";

const LoginForm = () => {
    const [userFormData, setUserFormData] = useState({ username: "", password: "" });
    const [loginUser, { error }] = useMutation(LOGIN_USER);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        try {
          const { data } = await loginUser({
            variables: { ...userFormData },
          });
          Auth.login(data.login.token);
        } catch (err) {
          console.error(err);
        }
    
        setUserFormData({
          username: "",
          password: "",
        });
    };

    return (
        <>
            <form id="login" onSubmit={handleFormSubmit} className="object-center flex flex-col items-center text-slate-50 from-charcoal to-slate rounded-md p-4 w-full">
                <input
                    className='form-input m-2 text-lg font-cormorant font-bold rounded-md'
                    placeholder='Your username'
                    name='username'
                    type='input'
                    id='username'
                    value={userFormData.username}
                    onChange={handleInputChange}
                />
                <input
                    className='form-input m-2 text-lg font-cormorant font-bold rounded-md'
                    placeholder='Your password'
                    name='password'
                    type='password'
                    id='password'
                    value={userFormData.password}
                    onChange={handleInputChange}
                />
                <button className='form-btn text-slate d-block w-50 m-5 text-lg font-macondo bg-turq/75 w-1/2' type='submit'>
                   Submit
                </button>
            </form>
            {error && <div className='error-message'> {error.message} </div>}
        </>
    );
};

export default LoginForm;
