import React, { useState } from 'react';
import { useMutation } from '@apollo/client' 
import { ADD_CHARACTER } from '../utils/mutations';
import { QUERY_CHARACTER } from '../utils/queries';

function AddCharacter() {

    const [characterForm, setCharacterForm] = useState({
        name: '',
        class: '', 
        level: '', 
        background: '', 
        race: '', 
        alignment: '', 
        bio: '', 
        str: '', 
        dex: '', 
        con: '', 
        int: '', 
        wis: '',
        cha: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCharacterForm({ ...characterForm, [name]: value });
        console.log(characterForm);
    };

    const [addCharacter, { error }] = useMutation(ADD_CHARACTER, {
        update(cache, { data: { addCharacter } }) {
        try {
            const { characters } = cache.readQuery({ query: QUERY_CHARACTER });
            cache.writeQuery({
            query: QUERY_CHARACTER,
            data: { characters: [addCharacter, ...characters] }
            });
        } catch (err) {
            console.error(err);
        }

        // const { me } = cache.readQuery({ query: QUERY_ME });
        // cache.writeQuery({
        //   query: QUERY_ME,
        //   data: { me: { ...me, posts: [...me.posts, addPost] } }
        // });
        }
    });


    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await addCharacter({
                variables: { ...characterForm }
            });
        } catch (err) {
            console.error(err);
        }

        setCharacterForm({
            name: '',
            class: '', 
            level: '', 
            background: '', 
            race: '', 
            alignment: '', 
            bio: '', 
            str: '', 
            dex: '', 
            con: '', 
            int: '', 
            wis: '',
            cha: ''
        });
    };

    return( 
        <form onSubmit={handleFormSubmit} className="object-center flex flex-col items-center text-slate-50  from-charcoal to-slate rounded-md p-4 w-full">
                <input
                    className='form-input m-2 text-lg font-cormorant font-bold rounded-md'
                    placeholder="Every campaign needs a name. What's yours?"
                    name='name'
                    type='input'
                    id='name'
                    value={characterForm.name}
                    onChange={handleInputChange}
                />
                {/* STOPPED HERE 9:30 18TH */}
                <textarea
                    className='form-input m-2 text-lg font-cormorant font-bold rounded-md'
                    placeholder='Tell us a little about your campaign.'
                    name='class'
                    type='text'
                    id='class'
                    value={characterForm.class}
                    onChange={handleInputChange}
                ></textarea>
                <input
                    className='form-input m-2 text-lg font-cormorant font-bold rounded-md'
                    placeholder='Where is your campaign starting?'
                    name='setting'
                    type='text'
                    id='setting'
                    value={characterForm.setting}
                    onChange={handleInputChange}
                />
                <button className='form-btn d-block w-50 m-5 text-lg text-slate font-macondo bg-turq/75' type='submit'>
                    Submit
                </button>
            </form>
    )
}

export default AddCharacter; 