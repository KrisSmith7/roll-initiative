import React from "react";
import { Link } from 'react-router-dom';



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
                    <div key={character._id} className="p-2"> 
                        <h1 className="h-16 w-64 bg-gradient-to-b from-turq/[.35] text-slate p-2">{character.name}</h1>
                        <Link
                            to={`/character/${character._id}`}
                        >
                            <div>
                                <p className="text-sienna">View {character.name}'s character sheet! </p>
                            </div> 
                        </Link>
                    </div>
                )   
            })}
        </>
    )
}

export default Characters;