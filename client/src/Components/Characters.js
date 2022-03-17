import React from "react";


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
                        <div
                            onClick={() => handlePageChange(`character/${character.id}`)}
                            >
                            <p>View {character.name}'s character sheet! </p>
                            </div> 
                    </div>
                )   
            })}
        </>
    )
}

export default Characters;