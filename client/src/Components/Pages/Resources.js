import React, {useState, useEffect} from "react";
import stockImg7 from "../../assets/stock_images/stock_image7.jpg"

function Resources (){
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);
        const [items, setItems] = useState([{}]);
      
      
        useEffect(() => {
          fetch("https://api.open5e.com/weapons/")
            .then(res => res.json())
            .then(
                (results) => {
                    setIsLoaded(true);
                    setItems(results.results);
                    console.log(items)
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
            )
        }, [])
      
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
                 <img src={stockImg7} className="h-full w-full object-contain opacity-50"/>
                 </div>

            <div className="p-8 w-full lg:h-1/6 flex flex-wrap text-white">
                <button className="h-1/2 w-full p-2.5 lg:p-6 mx-2.5 my-1.5 bg-sienna rounded-lg lg:text-4xl uppercase lg:font-bold">Spells</button>
                <button className="h-1/2 w-full p-2.5 lg:p-6 mx-2.5 my-1.5 bg-sienna rounded-lg lg:text-4xl uppercase lg:font-bold">Monsters</button>
                <button className="h-1/2 w-full p-2.5 lg:p-6 mx-2.5 my-1.5 bg-sienna rounded-lg lg:text-4xl uppercase lg:font-bold">Backgrounds</button>
                <button className="h-1/2 w-full p-2.5 lg:p-6 mx-2.5 my-1.5 bg-sienna rounded-lg lg:text-4xl uppercase lg:font-bold">Races</button>
                <button className="h-1/2 w-full p-2.5 lg:p-6 mx-2.5 my-1.5 bg-sienna rounded-lg lg:text-4xl uppercase lg:font-bold">Classes</button>
                <button className="h-1/2 w-full p-2.5 lg:p-6 mx-2.5 my-1.5 bg-sienna rounded-lg lg:text-4xl uppercase lg:font-bold">Magic Items</button>
                <button className="h-1/2 w-full p-2.5 lg:p-6 mx-2.5 my-1.5 bg-sienna rounded-lg lg:text-4xl uppercase lg:font-bold">Weapons</button>
            </div>

               <div className="h-3/5 bg-sienna overflow-auto">
            {items.map(item =>
                     <div className="bg-gray-900/[.35] mb-4 lg:mx-4 py-4 text-sm">
                         <h1 className="text-3xl text-center">{item.name}</h1>
                 {  
                //   console.log(item)
                     Object.keys(item).map((key,i) => (
                            // console.log(key,i,item[key])
                   <div key={i} className="px-2 lg:py-2 lg:px-4 text-white leading-loose">
                       <span className="capitalize font-light lg:pr-8">{key}: </span>
                       <span className="font-semibold tracking-wide font-unicase"> {item[key]}</span>
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