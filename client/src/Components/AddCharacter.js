import React, { useState } from 'react';
import { useMutation } from '@apollo/client' 
import { ADD_CHARACTER } from '../utils/mutations';
import { QUERY_CHARACTER, QUERY_ME } from '../utils/queries';

function AddCharacter({ handleClose }) {

    const [characterForm, setCharacterForm] = useState({
        name: '',
        class: '', 
        level: '', 
        background: '', 
        race: '', 
        alignment: '', 
        bio: '', 
        // str: '', 
        // dex: '', 
        // con: '', 
        // int: '', 
        // wis: '',
        // cha: ''
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
            console.log(characters);
            cache.writeQuery({
            query: QUERY_CHARACTER,
            data: { characters: [addCharacter, ...characters] }
            });
        } catch (err) {
            console.error(err);
        }

        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, characters: [...me.characters, addCharacter] } }
        });
        }
    });


    const handleFormSubmit = async (event) => {
        event.preventDefault();

        characterForm.level = parseInt(characterForm.level); 

        try {
            console.log(characterForm);
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
            // str: '', 
            // dex: '', 
            // con: '', 
            // int: '', 
            // wis: '',
            // cha: ''
        });
    };

    return( 
        <form onSubmit={handleFormSubmit} className="object-center flex flex-col items-center text-slate-50  from-charcoal to-slate rounded-md p-4 w-full">
                <label for="name">Name</label>
                <input
                    className='form-input m-2 text-lg font-cormorant font-bold rounded-md'
                    placeholder="Pick a beautiful name!"
                    name='name'
                    type='input'
                    id='name'
                    value={characterForm.name}
                    onChange={handleInputChange}
                />
                <label for="class">Class</label>
                <input
                    className='form-input m-2 text-lg font-cormorant font-bold rounded-md'
                    placeholder='We going martial or spellcaster?'
                    name='class'
                    list="classes"
                    id='class'
                    value={characterForm.class}
                    onChange={handleInputChange}
                ></input>
                    <datalist id="classes">
                        <option value={"Barbarian"}></option>
                        <option value={"Bard"}></option>
                        <option value={"Cleric"}></option>
                        <option value={"Druid"}></option>
                        <option value={"Fighter"}></option>
                        <option value={"Monk"}></option>
                        <option value={"Paladin"}></option>
                        <option value={"Ranger"}></option>
                        <option value={"Rogue"}></option>
                        <option value={"Sorcerer"}></option>
                        <option value={"Warlock"}></option>
                        <option value={"Wizard"}></option>
                        <option value={"Artificer"}></option>
                        <option value={"Blood Hunter"}></option>
                    </datalist>
                <label for="level">Level</label>
                <input
                    className='form-input m-2 text-lg font-cormorant font-bold rounded-md'
                    placeholder='What level are we starting at?'
                    name='level'
                    type='number'
                    id='level'
                    max={20}
                    min={1}
                    value={characterForm.level}
                    onChange={handleInputChange}
                />
                <label for="race">Race</label>
                <input
                    className='form-input m-2 text-lg font-cormorant font-bold rounded-md'
                    placeholder='So many playable races!'
                    name='race'
                    type='string'
                    id='race'
                    value={characterForm.race}
                    onChange={handleInputChange}
                />
                <label for="background">Background</label>
                <input
                    className='form-input m-2 text-lg font-cormorant font-bold rounded-md'
                    placeholder='Oh, which mysterious background have we chosen?'
                    name='background'
                    type='string'
                    id='background'
                    value={characterForm.background}
                    onChange={handleInputChange}
                />
                <label for="alignment">Alignment</label>
                <input
                    className='form-input m-2 text-lg font-cormorant font-bold rounded-md'
                    placeholder='Let me guess, chaotic good?'
                    name='alignment'
                    type='string'
                    list="alignments"
                    id='alignment'
                    value={characterForm.alignment}
                    onChange={handleInputChange}
                />
                    <datalist id="alignments">
                        <option value={"Lawful Good"}></option>
                        <option value={"Lawful Neutral"}></option>
                        <option value={"Lawful Evil"}></option>
                        <option value={"Neutral Good"}></option>
                        <option value={"True Neutral"}></option>
                        <option value={"Neutral Evil"}></option>
                        <option value={"Chaotic Good"}></option>
                        <option value={"Chaotic Neutral"}></option>
                        <option value={"Chaotic Evil"}></option> 
                    </datalist>
                <label for="bio">Biography</label>
                <textarea
                    className='form-input m-2 text-lg font-cormorant font-bold rounded-md'
                    placeholder='Give us some backstory on that panache!'
                    name='bio'
                    type='string'
                    id='bio'
                    value={characterForm.bio}
                    onChange={handleInputChange}
                />
                <button onClick={handleClose} className='form-btn d-block w-50 m-5 text-lg text-slate font-macondo bg-turq/75' type='submit'>
                    Submit
                </button>
            </form>
    )
}

export default AddCharacter; 