import React, { useState, useEffect } from 'react';
import NavTabs from './NavTabs';
import Footer from './Footer';
import Homepage from './Pages/Homepage';
import Dashboard from './Pages/Dashboard';
import Campaigns from './Pages/Campaigns';
import Characters from './Pages/Characters';
import Resources from './Pages/Resources';

export default function SiteContainer() {
  const [currentPage, setCurrentPage] = useState('Homepage');
  // automates change from landing page to about page on first render after 3 seconds.
  useEffect(() => { setTimeout((page) => { handlePageChange('Dashboard') }, 3000) }, []);

  const renderPage = () => {
    if (currentPage === 'Homepage') {
      return <Homepage />;
    }

    if (currentPage === 'Dashboard') {
      return (
        <div>
          <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
          <Dashboard />
        </div>
      );
    }

    if (currentPage === 'Campaigns') {
      return (
        <div>
          <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
          <Campaigns />
        </div>
      );
    }

    if (currentPage === 'Characters') {
      return (
        <div>
          <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
          <Characters />
        </div>
      );
    }

    if (currentPage === 'Resources') {
      return (
      <div>
        <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
        <Characters />
      </div>
      );
    }

  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <section>
      {/* conditionally renders component based on value of the currentPage variable; calls the function */}
      {renderPage()}
      <Footer />

    </section>
  );
}