import React, {useState } from 'react';
// import useStorage from '../Firebase/useStorage';
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../utils/mutations';
import knight from "../assets/stock_images/knight.png"

const EditProfile = (props) => {
    const {handleCloseEdit, bio }  = props;

    const [ icons ] = useState([
        {
            name: 'icon-1'
        }, 
        {
            name: 'icon-2'
        }, 
        {
            name: 'icon-3'
        }, 
        {
            name: 'icon-4'
        }
    ])

    const [updateUser, { error }] = useMutation(UPDATE_USER);
    const [updatedBioText, setUpdatedBioText] = useState(bio);
    const [image, setImage] = useState('')
    console.log(bio);

    const handleChange = event => {
        console.log(event.target.value);
        if (event.target.value) {
            setUpdatedBioText(event.target.value);
        }
        setImage(event.target.checked.value);
    };

    
    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            const updatedBio = await updateUser({
                variables: { bio: updatedBioText }
            });
            console.log(updatedBio);
        } catch (err) {
            console.error(err)
        }
    };

    const closeError = () => {
        const errorMessage = document.querySelector('#errorMessage');
        errorMessage.style.display = "none";
    }

    return (
        <div>
            
            <form onSubmit={handleFormSubmit} className="object-center flex flex-col items-center text-slate-50  from-charcoal to-slate rounded-md p-4 w-full">
                <h2 className='text-2xl font-bold text-slate font-macondo'> Choose an image for your profile </h2>
                <div className='flex flex-wrap justify-center'>
                    {icons.map(icon => 
                        <div key={icon.name} className="p-2 m-2">
                            <input className="hidden" type="radio" name="image" id={icon.name} value={icon.name} onChange={handleChange}/>
                            <label className='flex flex-col' htmlFor={icon.name}>
                                <img className='w-full h-full' alt="profile icon" src={require(`../../src/assets/icons/${icon.name}.jpg`)}/>
                            </label>
                        </div>
                    )}
                </div>
                <h2 className='text-2xl font-bold text-slate font-macondo'> Share a little about yourself... </h2>
                <div className='p-2 mt-3 w-8/12 h-60 bg-sienna/50 flex flex-col items-center'>
                    <label htmlFor='bio' className='text-2xl font-bold text-slate font-macondo'>Bio</label>
                    <input className="p-2 m-3 w-full h-full text-slate flex justify-center text-center" type="text" name="bio" value={updatedBioText} onChange={handleChange} />
                </div> 
                {error && 
                    <div id="errorMessage" className='bg-slate h-screen flex flex-col justify-center items-center error-message' onClick={closeError}> 
                        <p className="text-4xl font-macondo uppercase" >{error.message} !</p>
                        <img src={knight} alt='knight'/>
                    </div>
                }
                <Link to='/profile' className='text-lg text-sienna font-bold'> ← Back to Profile</Link>
                <button type="submit" className='form-btn d-block w-50 m-5 text-lg text-slate font-macondo bg-turq/75' onClick={handleCloseEdit}>
                Save Changes
                </button>
            </form>
            
            <div className='output'></div>
        </div>
    )
};

export default EditProfile;