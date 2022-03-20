import React from 'react'; 
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_CHARACTER } from '../../utils/queries';
import { PageTitle, StatBlock, Note, MagicItem } from 'dungeons-and-components';


const SingleCharacter = () => {

    const { id: idParam } = useParams(); 

    const { loading, data } = useQuery(QUERY_CHARACTER, {
        variables: { id: idParam }
    });

    console.log(data); 

    if (loading) {
        return(
            <p>No data yet!</p> 
        )
    }

    const character = data.character; 

    const characterChangeHandler = (e) => {
        console.log(e.target);
    }

    return(
        <div className="flex flex-col items-center tracking-wider text-md p-4 lg:text-xl lg:p-8"> 
            <div className='flex justify-center'>
                <Link to="/profile" className='text-slate font-bold mt-5'> ← Back to Profile </Link>
            </div>
            <PageTitle>{character.name}</PageTitle>
            <MagicItem title={'Biography'}>
                <p>{character.bio}</p>
            </MagicItem>
            <div className='flex justify-between'>
            <Note className='mx-4 p-5'>
                <h1>Class</h1><textarea defaultValue={character.class} name="class" onBlur={characterChangeHandler}></textarea>
                <h1>Race</h1><textarea defaultValue={character.race} name="race" onBlur={characterChangeHandler}></textarea>
                <h1>Level</h1><textarea defaultValue={character.level} name="level" onBlur={characterChangeHandler}></textarea>
                <h1>Background</h1><textarea defaultValue={character.background} name="background" onBlur={characterChangeHandler}></textarea>
                <h1>Bio</h1><textarea defaultValue={character.bio} name="bio" onBlur={characterChangeHandler}></textarea>
            </Note>
            <StatBlock className='mx-4 p-5'>
                <h1>Strength</h1><textarea defaultValue={character.str} name='str' onBlur={characterChangeHandler}></textarea>
                <h1>Dexterity</h1><textarea defaultValue={character.dex} name='dex' onBlur={characterChangeHandler}></textarea>
                <h1>Constitution</h1><textarea defaultValue={character.con} name='con' onBlur={characterChangeHandler}></textarea>
                <h1>Wisdom</h1><textarea defaultValue={character.wis} name='wis' onBlur={characterChangeHandler}></textarea>
                <h1>Intelligence</h1><textarea defaultValue={character.int} name='int' onBlur={characterChangeHandler}></textarea>
                <h1>Charisma</h1><textarea defaultValue={character.cha} name='cha' onBlur={characterChangeHandler}></textarea>
            </StatBlock>
            </div>
        </div>
    )
}

export default SingleCharacter; 