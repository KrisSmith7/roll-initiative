import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from "../../utils/auth";

const LoginForm = () => {
    const [userFormData, setUserFormData] = useState({ username: "", password: "" });
    const [loginUser] = useMutation(LOGIN_USER);

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
            <form onSubmit={handleFormSubmit} className="flex flex-col items-center text-slate-50">
                <input
                    className='form-input m-2'
                    placeholder='Your username'
                    name='username'
                    type='username'
                    id='username'
                    value={userFormData.username}
                    onChange={handleInputChange}
                />
                <input
                    className='form-input m-2'
                    placeholder='Your password'
                    name='password'
                    type='password'
                    id='password'
                    value={userFormData.password}
                    onChange={handleInputChange}
                />
                <button className='btn d-block w-100' type='submit'>
                   Submit
                </button>
            </form>
        </>
    );
};

export default LoginForm;
