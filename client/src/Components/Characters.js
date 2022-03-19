import React from "react";
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_CHARACTER } from "../utils/mutations";
import { QUERY_ME, QUERY_CHARACTER } from "../utils/queries";



function Characters ({ characters, isMe }) { 

    const [deleteCharacter, { error }] = useMutation(DELETE_CHARACTER, {
        update(cache, { data: { deleteCharacter }}) {
            try {
                const { characters } = cache.readQuery({ query: QUERY_CHARACTER });
                console.log(characters);
                cache.writeQuery({
                query: QUERY_CHARACTER,
                data: { characters: [...characters] }
                });
            } catch (err) {
                console.error(err);
            }

            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
              query: QUERY_ME,
              data: { me: { ...me, characters: [...me.characters ] } }
            });
        }
    });

    const handleCharacterDelete = async (id) => {
        console.log(id);
        
        try {
            await deleteCharacter({
                variables: { _id: id }
            });

            console.log('deleted character ', id);
        } catch (err) {
            console.log(err);
        }

        
    }

    if (!characters.length) {
        return (
        <h2>Create a character to view them here!</h2>
        )
    }

    return (
        <>
            {characters.map(character => {
                return( 
                    <div key={character._id}> 
                        <h1>{character.name}</h1>
                        <Link
                            to={`/character/${character._id}`}
                        >
                            <div>
                                <p>View {character.name}'s character sheet! </p>
                            </div> 
                        </Link>
                        {isMe && 
                        <button
                            onClick={(e) => handleCharacterDelete(character._id)}>Delete {character.name}?</button>}
                    </div>
                )   
            })}
        </>
    )
}

export default Characters;