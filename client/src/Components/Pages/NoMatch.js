import React from 'react';
import knight from '../../assets/stock_images/knight.png'

const NoMatch = () => {
  return (
    <div>
        <div class="bg-slate h-screen flex flex-col lg:flex-row justify-center items-center">
              <img src={knight} alt='knight'/>
            <p className="text-4xl">Critical failure on your perception check. Either log in for advantage or find a valid page!</p>
        </div>
    </div>
  );
};

export default NoMatch;