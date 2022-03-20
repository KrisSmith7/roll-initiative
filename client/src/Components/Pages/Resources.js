import React, {useState, useEffect} from "react";

function Resources (){
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);
        const [items, setItems] = useState([]);
      
        // Note: the empty deps array [] means
        // this useEffect will run once
        // similar to componentDidMount()
        useEffect(() => {
          fetch("https://api.open5e.com/spells/")
            .then(res => res.json())
            .then(
                (results) => {
                  console.log([results])
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
console.log ([items]);
          return (
              
              <section className="bg-charcoal h-full">
                  
            <ul>
              {items.map((item, i) => (
                  <li key={item[i]}>
                  {item.name}
                </li>
               ))}
            </ul>
              </section>
          );
        }


export default Resources;