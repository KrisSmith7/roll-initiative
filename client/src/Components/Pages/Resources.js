import React, { useState, useEffect } from "react";
import stockImg7 from "../../assets/stock_images/stock_image7.jpg"

function Resources() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([{}]);
    const [url, setURL] = useState(("https://api.open5e.com/spells"))

    const handleInput = (evt) => {
        const searchItem = evt.target.value
        // console.log(searchItem)
        setURL(`https://api.open5e.com/${searchItem}`)
        // console.log(url);
    }

    useEffect(() => {
        const fetchData = async () => {
            const urlData = await fetch(url)
                .then(res => res.json())
                .then(
                    (results) => {
                        setIsLoaded(true);
                        setTimeout(() => {
                            setItems(results.results)}, 1000)
                        // console.log(items)
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }

        fetchData()
            .catch(console.error)
    }, [handleInput])

    if (error) {
        return (<div>Error: {error.message}</div>)
    }

    if (!isLoaded) {
        return (
            <div>Loading...</div>)
    }

    return (

        <section className="h-full">
            <div className="w-full relative">
                <div className="bg-sienna/50 inset-0 absolute"></div>
                <img src={stockImg7} className="h-full w-full object-contain opacity-50" />
            </div>

            <div><p className="text-center py-4 text-2xl">Just getting started? Click a button to find a little more info to help you design your next character or in your next campaign!</p></div>

            <div className="md:py-6 w-full flex flex-wrap text-white">
                <button value={"spells"} onClick={evt => handleInput(evt)} className="h-1/2 w-full md:w-1/5 p-2.5 mx-2.5 my-1.5 bg-sienna rounded-lg uppercase md:font-bold">Spells</button>
                <button value={"backgrounds"} onClick={evt => handleInput(evt)} className="h-1/2 w-full md:w-1/5 p-2.5 mx-2.5 my-1.5 bg-sienna rounded-lg uppercase md:font-bold">Backgrounds</button>
                <button value={"magicitems"} onClick={evt => handleInput(evt)} className="h-1/2 w-full md:w-1/5 p-2.5 mx-2.5 my-1.5 bg-sienna rounded-lg uppercase md:font-bold">Magic Items</button>
                <button value={"weapons"} onClick={evt => handleInput(evt)} className="h-1/2 w-full md:w-1/5 p-2.5 mx-2.5 my-1.5 bg-sienna rounded-lg uppercase md:font-bold">Weapons</button>
                <button value={"conditions"} onClick={evt => handleInput(evt)} className="h-1/2 w-full md:w-1/5 p-2.5 mx-2.5 my-1.5 bg-sienna rounded-lg uppercase md:font-bold">Conditions</button>
                <button value={"sections"} onClick={evt => handleInput(evt)} className="h-1/2 w-full md:w-1/5 p-2.5 mx-2.5 my-1.5 bg-sienna rounded-lg uppercase md:font-bold">Game Descriptions</button>
                {/* <button value={"classes"} onClick={evt=>handleInput(evt)} className="h-1/2 w-full md:w-1/5 p-2.5 mx-2.5 my-1.5 bg-sienna rounded-lg uppercase md:font-bold">Classes</button> */}
                {/* <button value={"races"} onClick={evt=>handleInput(evt)} className="h-1/2 w-full md:w-1/5 p-2.5 mx-2.5 my-1.5 bg-sienna rounded-lg uppercase md:font-bold">Races</button> */}
                {/* <button value={"monsters"} onClick={evt => handleInput(evt)} className="h-1/2 w-full md:w-1/5 p-2.5 mx-2.5 my-1.5 bg-sienna rounded-lg uppercase md:font-bold">Monsters</button> */}
            </div>

            <div className="h-fit-content bg-sienna overflow-auto md:flex">
                {items.map(item =>
                    <div className="bg-gray-900/[.35] mb-4 lg:mx-4 py-4">
                        <h1 className="text-3xl text-center">{item.name}</h1>
                        {
                            //   console.log(item)
                            Object.keys(item).map((key, i) => (
                                // console.log(key,i,item[key])
                                <div key={i} className="px-2 lg:py-2 lg:px-4 lg:text-xl text-white leading-loose">
                                    <span className="capitalize font-light text-sm lg:pr-4">{key}:</span>
                                    <span className="font-semibold tracking-widest font-unicase"> {item[key]}</span>
                                </div>
                            ))
                        }
                    </div>
                )
                }
            </div>
        </section>
    );
}


export default Resources;