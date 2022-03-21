import React from "react";
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { DELETE_CHARACTER } from "../utils/mutations";
import { QUERY_ME, QUERY_CHARACTER } from "../utils/queries";



function Characters ({ characters, isMe }) { 


    console.log(isMe); 
    
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

            console.log(characters); 

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
                    <div key={character._id} className="p-2 mx-4 border-2 rounded-md"> 
                        <h1 className="h-16 w-64 bg-gradient-to-b from-turq/[.75] text-slate p-2">{character.name}</h1>
                        <Link
                            to={`/character/${character._id}`}
                        >
                            <div>
                                <p className="text-sienna">View {character.name}'s character sheet! </p>
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