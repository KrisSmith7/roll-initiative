import React, {useState } from 'react';
import useStorage from '../Firebase/useStorage';


const EditProfile = ({ handleCloseEdit }) => {
    const [file, setFile] = useState(null);

    const handleChange = (event) => {
        const selected = event.target.files[0];

        if (selected) {
            setFile(selected);
        }
    }

    
    const handleFormSubmit = async (event ) => {
        event.preventDefault();

        

    }

    return (
        <div>
            <h2> Choose an image for your profile </h2>
            <form onSubmit={handleFormSubmit} className="object-center flex flex-col items-center text-slate-50  from-charcoal to-slate rounded-md p-4 w-full">
                <select>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                </select>
                <input type="file" id="image-input" accept='image/png, image/jpg' onChange={handleChange}/>
                <button type="submit" className='form-btn d-block w-50 m-5 text-lg text-slate font-macondo bg-turq/75' onClick={handleCloseEdit}>
                Save Changes
                </button>
            </form>
            <div className='output'>{ file && <div>{ file.name }</div> }</div>
        </div>
    )
};

export default EditProfile;