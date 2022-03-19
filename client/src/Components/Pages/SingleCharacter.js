import React from 'react'; 
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_CHARACTER } from '../../utils/queries';
import { PageTitle, StatBlock, Note, MagicItem } from 'dungeons-and-components';


function SingleCharacter() {

    const { id: idParam } = useParams(); 

    const { loading, data } = useQuery(QUERY_CHARACTER, {
        variables: { id: idParam }
    });

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
        <div className="tracking-wider text-md p-4 lg:text-xl lg:p-8"> 

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
           

        </div>
    )
}

export default SingleCharacter; 