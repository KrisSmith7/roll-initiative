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
                        setTimeout(() => {setItems(results.results) } , 2000)
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

        <section className="h-screen">
            <div className="w-full relative mt-10">
                <div className="bg-sienna/50 inset-0 absolute"></div>
                <img src={stockImg7} className="h-full w-full object-contain opacity-50" />
            </div>

        <div className="bg-gray-900 py-4 px-2">
            <div><p className="text-center pb-4 text-2xl">Just getting started? Click a button to find a little more info to help you design your next character or just learn more about the game!</p></div>

            <div className="md:py-6 w-full flex flex-wrap text-white">
                <button value={"spells"} onClick={evt => handleInput(evt)} className="h-1/2 w-full md:w-1/5 p-2.5 mx-2.5 my-1.5 bg-sienna rounded-lg uppercase md:font-bold hover:bg-white hover:text-sienna active:bg-white active:text-sienna">Spells</button>
                <button value={"backgrounds"} onClick={evt => handleInput(evt)} className="h-1/2 w-full md:w-1/5 p-2.5 mx-2.5 my-1.5 bg-sienna rounded-lg uppercase md:font-bold hover:bg-white hover:text-sienna active:bg-white active:text-sienna">Backgrounds</button>
                <button value={"magicitems"} onClick={evt => handleInput(evt)} className="h-1/2 w-full md:w-1/5 p-2.5 mx-2.5 my-1.5 bg-sienna rounded-lg uppercase md:font-bold hover:bg-white hover:text-sienna active:bg-white active:text-sienna">Magic Items</button>
                <button value={"weapons"} onClick={evt => handleInput(evt)} className="h-1/2 w-full md:w-1/5 p-2.5 mx-2.5 my-1.5 bg-sienna rounded-lg uppercase md:font-bold hover:bg-white hover:text-sienna active:bg-white active:text-sienna">Weapons</button>
                <button value={"conditions"} onClick={evt => handleInput(evt)} className="h-1/2 w-full md:w-1/5 p-2.5 mx-2.5 my-1.5 bg-sienna rounded-lg uppercase md:font-bold hover:bg-white hover:text-sienna active:bg-white active:text-sienna">Conditions</button>
                <button value={"sections"} onClick={evt => handleInput(evt)} className="h-1/2 w-full md:w-1/5 p-2.5 mx-2.5 my-1.5 bg-sienna rounded-lg uppercase md:font-bold hover:bg-white hover:text-sienna active:bg-white active:text-sienna">Game Descriptions</button>
                {/* <button value={"classes"} onClick={evt=>handleInput(evt)} className="h-1/2 w-full md:w-1/5 p-2.5 mx-2.5 my-1.5 bg-sienna rounded-lg uppercase md:font-bold hover:bg-white hover:text-sienna">Classes</button> */}
                {/* <button value={"races"} onClick={evt=>handleInput(evt)} className="h-1/2 w-full md:w-1/5 p-2.5 mx-2.5 my-1.5 bg-sienna rounded-lg uppercase md:font-bold hover:bg-white hover:text-sienna">Races</button> */}
                {/* <button value={"monsters"} onClick={evt => handleInput(evt)} className="h-1/2 w-full md:w-1/5 p-2.5 mx-2.5 my-1.5 bg-sienna rounded-lg uppercase md:font-bold hover:bg-white hover:text-sienna">Monsters</button> */}
            </div>
        </div>
            <div className="bg-sienna p-2 overflow-y-auto md:grid md:grid-cols-2  lg:grid-cols-4">
                {items.map(item =>
                    <div className="bg-gray-900/[.35] rounded-lg mb-4 lg:mx-4 p-4 min-w-[30%] ">
                        <h1 className="text-3xl text-center">{item.name}</h1>
                        <div className="h-1/3 object-contain">
                        {
                            //   console.log(item)
                            Object.keys(item).map((key, i) => (
                                // console.log(key,i,item[key])
                                <div key={i} className="px-2 lg:py-2 lg:px-4 lg:text-xl text-white leading-loose border-b overflow-auto">
                                    <span className="capitalize font-light text-sm lg:pr-4">{key}:</span>
                                    <span className="font-semibold tracking-widest font-unicase whitespace-normal"> {item[key]}</span>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                )
                }
            </div>
        </section>
    );
}


export default Resources;