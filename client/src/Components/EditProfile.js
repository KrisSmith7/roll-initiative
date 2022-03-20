import React from 'react';

const EditProfile = ({ handleCloseEdit }) => {
    const handleFormSubmit = async event => {
        event.preventDefault();
        
    };

    return (
        <div>
            <h2> Choose an image for your profile </h2>
            <form onSubmit={handleFormSubmit} className="object-center flex flex-col items-center text-slate-50  from-charcoal to-slate rounded-md p-4 w-full">
                
                <button type="submit" className='form-btn d-block w-50 m-5 text-lg text-slate font-macondo bg-turq/75' onClick={handleCloseEdit}>
                Save Changes
                </button>
            </form>
        </div>
    )
};

export default EditProfile;