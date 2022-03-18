import React from 'react'; 
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_CHARACTER } from '../../utils/queries';
import { DnDCharacterStatsSheet } from 'dnd-character-sheets';
import 'dnd-character-sheets/dist/index.css';

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

    return(
        <div> 
            <h1> Single Character Page </h1> 
            <h1>{character.name}</h1>
            <DnDCharacterStatsSheet />
        </div>
    )
}

export default SingleCharacter; 