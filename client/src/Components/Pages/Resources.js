import React, {useState, useEffect} from "react";

function Resources (){
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);
        const [items, setItems] = useState([{}]);
      
        // Note: the empty deps array [] means
        // this useEffect will run once
        // similar to componentDidMount()
        useEffect(() => {
          fetch("https://api.open5e.com/spells/?limit=5")
            .then(res => res.json())
            .then(
                (results) => {
                    setIsLoaded(true);
                    setItems(results.results);
                    // console.log(items)
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
             
             <section className="bg-charcoal h-full">
               <div className="h-1/2">
            {items.map(item =>
                 { return (
                //   console.log(item)
                     Object.keys(item).map((key,i) => (
                            // console.log(key,i,item[key])

                   <p key={i} className="py-2">
                       <span className="uppercase">{key}: </span>
                       <span className="normal-case"> {item[key]}</span>
                       </p>
               ))
                 )
               }
            )}

                   </div> 
              </section>
          );
        }


export default Resources;