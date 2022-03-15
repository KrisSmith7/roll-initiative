import React, { useState } from 'react';
import NavTabs from './NavTabs';
import Footer from './Footer';
import Homepage from './Pages/Homepage';
import Dashboard from './Pages/Dashboard';
import Campaigns from './Pages/Campaigns';
import Characters from './Pages/Characters';
import Resources from './Pages/Resources';
    
    export default function SiteContainer() {
      const [currentPage, setCurrentPage] = useState('Homepage');
    
      const renderPage = () => {
        if (currentPage === 'Homepage') {
                return <Homepage />;
        }
        if (currentPage === 'Dashboard') {
          return <Dashboard />;
        }
        if (currentPage === 'Campaigns') {
          return <Campaigns />;
        }
        if (currentPage === 'Characters') {
          return <Characters />;
        }
        if (currentPage === 'Resources') {
          return <Resources />;
        }
      
      };
    
      const handlePageChange = (page) => setCurrentPage(page);
    
      return (
        <div>
          {/* currentPage is a variable being passed as a prop for the NavTabs, handlePageChange is another prop referencing the value of the callback function used in the NavTabs component
          passing the current page from state and the function to update it */}
          <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
          {/* conditionally renders component based on value of the currentPage variable; calls the function */}
          {renderPage()}
          <Footer/>
          
        </div>
      );
    }