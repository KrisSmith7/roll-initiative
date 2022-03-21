import React, {useState, useEffect} from "react";

function Resources (){
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);
        const [items, setItems] = useState([{}]);
      
        // Note: the empty deps array [] means
        // this useEffect will run once
        // similar to componentDidMount()
        useEffect(() => {
          fetch("https://api.open5e.com/weapons/")
            .then(res => res.json())
            .then(
                (results) => {
                    setIsLoaded(true);
                    setItems(results.results);
                    console.log(items)
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
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
               <div className="h-2/3 overflow-auto">
            {items.map(item =>
                     <div className="bg-sienna mb-4 mx-4 py-2">
                 {  
                //   console.log(item)
                     Object.keys(item).map((key,i) => (
                            // console.log(key,i,item[key])
                   <div key={i} className="py-2 px-4 text-3xl text-white">
                       <span className="uppercase font-light pr-8">{key}: </span>
                       <span className="uppercase font-semibold tracking-wide"> {item[key]}</span>
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