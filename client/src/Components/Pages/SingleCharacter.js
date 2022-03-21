import React, { useState, useEffect } from 'react'; 
import { useParams, Link, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { DELETE_CHARACTER, UPDATE_CHARACTER } from '../../utils/mutations';
import { QUERY_CHARACTER, QUERY_ME } from '../../utils/queries';
import { Page, PageTitle, StatBlock, Note, MagicItem } from 'dungeons-and-components';


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
    //console.log('character data: ', character);

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

    useEffect(() => {
            setCharacterForm({
                name: character?.name, 
                })
    }, []); 

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

    const [updateCharacter, { updateError }] = useMutation(UPDATE_CHARACTER, {
        // This part doesn't need to be here since when the character is updated it automatically
        // updates the cache.


        // update(cache, { data: { updateCharacter }}) {
        //     console.log(updateCharacter); 

        //     try {
        //         const { characters } = cache.readQuery({ query: QUERY_CHARACTER }); 
        //         cache.writeQuery({
        //             query: QUERY_CHARACTER, 
        //             data: { characters: [...characters].filter((character) => character._id !== updateCharacter._id).then(characters.push(updateCharacter))}
        //         });
        //     }
        //     catch (err) {
        //         console.error(err); 
        //     }

        //     const { me } = cache.readQuery({ query: QUERY_ME });
        //     console.log(me);
        //     cache.writeQuery({
        //       query: QUERY_ME,
        //       data: { me: { ...me, characters: [...me.characters].filter((character) => character._id !== deleteCharacter._id).then(me.characters.push(updateCharacter)) } }
        //     });
        // }
    } )

    const characterChangeHandler = (e) => { 
        //console.log(e.target.name);
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
            // characterForm.level = parseInt(characterForm.level); 
            // characterForm.str = parseInt(characterForm.str);
            // characterForm.dex = parseInt(characterForm.dex); 
            // characterForm.con = parseInt(characterForm.con); 
            // characterForm.wis = parseInt(characterForm.wis); 
            // characterForm.int = parseInt(characterForm.int); 
            // characterForm.cha = parseInt(characterForm.cha); 

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
        <div className="flex flex-col items-center tracking-wider text-md p-4 lg:text-xl lg:p-8"> 
            <div className='flex justify-center'>
                <Link to="/profile" className='text-slate font-bold mt-5'> ← Back to Profile </Link>
            </div>
            <Page>
                <PageTitle>{character.name}</PageTitle>
                <Note>
                    <h1>Class</h1><textarea defaultValue={character.class} name="class" onBlur={characterChangeHandler}></textarea>
                    <h1>Race</h1><textarea defaultValue={character.race} name="race" onBlur={characterChangeHandler}></textarea>
                    <h1>Level</h1><textarea defaultValue={character.level} name="level" onBlur={characterChangeHandler}></textarea>
                    <h1>Background</h1><textarea defaultValue={character.background} name="background" onBlur={characterChangeHandler}></textarea>
                    <h1>Bio</h1><textarea defaultValue={character.bio} name="bio" onBlur={characterChangeHandler}></textarea>
                </Note>
                <StatBlock>
                    <h1>Strength</h1><textarea defaultValue={character.str} name='str' onBlur={characterChangeHandler}></textarea>
                    <h1>Dexterity</h1><textarea defaultValue={character.dex} name='dex' onBlur={characterChangeHandler}></textarea>
                    <h1>Constitution</h1><textarea defaultValue={character.con} name='con' onBlur={characterChangeHandler}></textarea>
                    <h1>Wisdom</h1><textarea defaultValue={character.wis} name='wis' onBlur={characterChangeHandler}></textarea>
                    <h1>Intelligence</h1><textarea defaultValue={character.int} name='int' onBlur={characterChangeHandler}></textarea>
                    <h1>Charisma</h1><textarea defaultValue={character.cha} name='cha' onBlur={characterChangeHandler}></textarea>
                </StatBlock>
                <MagicItem title={'Biography'}>
                    <p>{character.bio}</p>
                </MagicItem>
            </Page>
            <button onClick={() => handleCharacterDelete(character._id)}>Delete {character.name}?</button>
            <button onClick={() => handleCharacterUpdate(character._id)}>Save Changes to {character.name}</button>
           

        </div>
    )
}

export default SingleCharacter; 