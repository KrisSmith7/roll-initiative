import React from "react";


function Characters ({ characters }) {

    if (!characters.length) {
        return (
        <h2>Create a character to view them here!</h2>
        )
    }

    return (
        <>
            {characters.map(character => {
                return( 
                    <h1>{character.name}</h1>
                )
            })}
        </>
    )
}

export default Characters;