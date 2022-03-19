import React from "react";
import { Link } from 'react-router-dom';



function Characters ({ characters, currentPage, handlePageChange }) {

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
                    </div>
                )   
            })}
        </>
    )
}

export default Characters;