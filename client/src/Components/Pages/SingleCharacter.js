import React, { useState } from 'react'; 
import { useParams, Link, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { DELETE_CHARACTER, UPDATE_CHARACTER } from '../../utils/mutations';
import { QUERY_CHARACTER, QUERY_ME } from '../../utils/queries';
import { Page, PageTitle, StatBlock, Note } from 'dungeons-and-components';


function SingleCharacter() {

    const history = useHistory(); 

    const routeChange = () => {
            let path = `/profile`;
            history.push(path);
    }

    const { id: idParam } = useParams(); 

    const { loading, data } = useQuery(QUERY_CHARACTER, {
        variables: { id: idParam }
    });    
    
    const character = data?.character;

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

    const [deleteCharacter, { error }] = useMutation(DELETE_CHARACTER, {
        update(cache, { data: { deleteCharacter }}) {

            console.log(deleteCharacter);

            try {
                const { characters } = cache.readQuery({ query: QUERY_CHARACTER });
                cache.writeQuery({
                query: QUERY_CHARACTER,
                data: { characters: [...characters].filter((character) => character._id !== deleteCharacter._id) }
                });
                
            } catch (err) {
                console.error(err);
            }

            // method called on array to remove specific char from cache
            // .filter((character) => character._id !== _id)

            const { me } = cache.readQuery({ query: QUERY_ME });
            console.log(me);
            cache.writeQuery({
              query: QUERY_ME,
              data: { me: { ...me, characters: [...me.characters].filter((character) => character._id !== deleteCharacter._id) } }
            });
        }
    });

    const handleCharacterDelete = async (id) => {
        console.log(id);
        
        try {
            await deleteCharacter({
                variables: { _id: id }
            });

            console.log('after await');

            console.log('deleted character ', id);
        } catch (err) {
            console.log(err);
        }   

        routeChange();
    }

    const [updateCharacter, { updateError }] = useMutation(UPDATE_CHARACTER);

    const characterChangeHandler = (e) => { 
        const { name, value } = e.target;
        console.log(`name: ${name}, value: ${value}`);
        console.log('characterForm:', characterForm);
        setCharacterForm({ ...characterForm, [name]: value});
        console.log('updated characterForm: ', characterForm);
    }

    const handleCharacterUpdate = async (id) => {
        let updatedCharacter = {
            name: characterForm?.name || character.name,
            level: parseInt(characterForm?.level || character.level),
            race: characterForm?.race || character.race,
            class: characterForm?.class || character.class,
            alignment: characterForm?.alignment || character.alignment,
            bio: characterForm?.bio || character.bio,
            background: characterForm?.background || character.background,
            str: parseInt(characterForm?.str || character.str),
            dex: parseInt(characterForm?.dex || character.dex),
            con: parseInt(characterForm?.con || character.con),
            wis: parseInt(characterForm?.wis || character.wis),
            int: parseInt(characterForm?.int || character.int),
            cha: parseInt(characterForm?.cha || character.cha),
        };
        console.log("updatedCharacter", updatedCharacter);
        try {
            await updateCharacter({
                variables: { 
                _id: id,
                name: updatedCharacter.name, 
                level: updatedCharacter.level,
                race: updatedCharacter.race,
                bio: updatedCharacter.bio,
                background: updatedCharacter.background,
                class: updatedCharacter.class,
                str: updatedCharacter.str,
                dex: updatedCharacter.dex,
                con: updatedCharacter.con,
                int: updatedCharacter.int,
                wis: updatedCharacter.wis,
                cha: updatedCharacter.cha }
            });

            console.log('after await update');

            console.log('updated character ', id);
        } catch (err) {
            console.log(err);
        }   
        routeChange(); 
    }


    if (loading) {
        return(
            <p>No data yet!</p> 
        )
    }

    return(
        <div className="flex flex-col items-center tracking-wider text-md p-4 lg:text-xl lg:p-8 text-rose-900"> 
            <div className='flex justify-center'>
                <Link to="/profile" className='text-slate font-bold my-5 text-3xl md:text-4xl'> ← Back to Profile </Link>
            </div>
            <Page className='flex flex-col items-center py-4 md:block'> 
                <PageTitle className='capitalize'>{character.name}</PageTitle>
                <Note className='flex flex-col text-xl text-center h-4/6 my-2'> 
                    <h1>Class</h1><input className='bg-inherit text-m w-3/5 m-auto px-5 pt-2 pb-3 shadow-lg' defaultValue={character.class} name="class" onBlur={characterChangeHandler}></input>
                    <h1>Race</h1><input className='bg-inherit w-3/5 m-auto px-5 pt-2 pb-3 shadow-lg' defaultValue={character.race} name="race" onBlur={characterChangeHandler}></input>
                    <h1>Level</h1><input className='bg-inherit w-3/5 m-auto px-5 pt-2 pb-3 shadow-lg' defaultValue={character.level} name="level" onBlur={characterChangeHandler}></input>
                    <h1>Background</h1><input className='bg-inherit w-3/5 m-auto p-1 pt-2 pb-3 shadow-lg' defaultValue={character.background} name="background" onBlur={characterChangeHandler}></input>
                    <h1>Bio</h1> <textarea  className='bg-inherit w-max m-auto pl-2 overflow-auto shadow-lg' defaultValue={character.bio} onBlur={characterChangeHandler}></textarea>
                </Note>
                <StatBlock className='flex flex-col text-xl text-center h-4/6'>
                    <h1>Strength</h1><input  className='bg-inherit w-1/2 m-auto px-5 pt-2 pb-3 shadow-lg'defaultValue={character.str} name='str' onBlur={characterChangeHandler}></input>
                    <h1>Dexterity</h1><input  className='bg-inherit w-1/2 m-auto px-5 pt-2 pb-3 shadow-lg'defaultValue={character.dex} name='dex' onBlur={characterChangeHandler}></input>
                    <h1>Constitution</h1><input  className='bg-inherit w-1/2 m-auto px-5 pt-2 pb-3 shadow-lg'defaultValue={character.con} name='con' onBlur={characterChangeHandler}></input>
                    <h1>Wisdom</h1><input className='bg-inherit w-1/2 m-auto px-5 pt-2 pb-3 shadow-lg' defaultValue={character.wis} name='wis' onBlur={characterChangeHandler}></input>
                    <h1>Intelligence</h1><input className='bg-inherit w-1/2 m-auto px-5 pt-2 pb-3 shadow-lg' defaultValue={character.int} name='int' onBlur={characterChangeHandler}></input>
                    <h1>Charisma</h1><input className='bg-inherit w-1/2 m-auto px-5 pt-2 pb-3 shadow-lg' defaultValue={character.cha} name='cha' onBlur={characterChangeHandler}></input>
                </StatBlock>
            </Page>
            <button className='text-white bg-emerald-900 p-2 m-2 rounded-md'
                onClick={() => handleCharacterUpdate(character._id)}>Save Changes to {character.name}</button>
            <button className='text-white bg-sienna/75 p-2 m-2 rounded-md' 
                onClick={() => handleCharacterDelete(character._id)}>Delete {character.name}?</button>
           

        </div>
    )
}

export default SingleCharacter; 