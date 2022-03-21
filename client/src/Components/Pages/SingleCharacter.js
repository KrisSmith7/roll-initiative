import React, { useState } from 'react'; 
import { useParams, Link, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { DELETE_CHARACTER } from '../../utils/mutations';
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

    // const [characterForm, setCharacterForm] = useState({
    //     name: character.name,
    //     class: character.class, 
    //     level: character.level, 
    //     background: character.background, 
    //     race: character.race, 
    //     alignment: character.alignment, 
    //     bio: character.bio, 
    //     str: character.str, 
    //     dex: character.dex, 
    //     con: character.con, 
    //     int: character.int, 
    //     wis: character.wis,
    //     cha: character.cha
    // });

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

    const characterChangeHandler = (e) => {
        console.log(e.target);
    }


    if (loading) {
        return(
            <p>No data yet!</p> 
        )
    }

    return(
        <div className="tracking-wider text-md p-4 lg:text-xl lg:p-8"> 
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
           

        </div>
    )
}

export default SingleCharacter; 