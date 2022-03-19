import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavTabs from './NavTabs';
import Footer from './Footer';
import Homepage from './Pages/Homepage';
import Dashboard from './Pages/Dashboard';
import SinglePost from './Pages/SinglePost';
import NoMatch from './Pages/NoMatch';
import AllCampaigns from './Pages/AllCampaigns';
import Profile from './Pages/Profile';
import Resources from './Pages/Resources';
import SingleCharacter from './Pages/SingleCharacter'

export default function SiteContainer() {
  const [currentPage, setCurrentPage] = useState('Dashboard');
  // automates change from landing page to about page on first render after 3 seconds.
  useEffect(() => { setTimeout((page) => { handlePageChange('Dashboard') }, 3000) }, []);

  // const characterPageCheck = (currentPage) => {
  //   const regex = new RegExp('character/');
    
  //   if (regex.test(currentPage)) {
  //     return true; 
  //   } else {
  //     return false; 
  //   }
    
  // }

  // const renderPage = () => {
  //   if (currentPage === 'Homepage') {
  //     return <Homepage />;
  //   }

  //   if (currentPage === 'Dashboard') {
  //     return (
  //       <div className='flex'>
  //         <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
  //         <Dashboard />
  //       </div>
  //     );
  //   }

  //   if (currentPage === 'Profile') {
  //     return (
  //       <div className='flex'>
  //         <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
  //         <Profile currentPage={currentPage} handlePageChange={handlePageChange} />
  //       </div>
  //     );
  //   }

  //   if (currentPage === 'Resources') {
  //     return (
  //     <div className='flex'>
  //       <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
  //       <Resources />
  //     </div>
  //     );
  //   }

  //   if (characterPageCheck(currentPage)) {
  //     return (
  //       <div className = 'flex'> 
  //         <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
  //         <div>
  //           <p> Help </p>
  //         </div>
  //       </div> 
  //     )
  //   }
  // };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <section className='overflow-auto h-screen w-full'>
      {/* conditionally renders component based on value of the currentPage variable; calls the function */}
      {/* {renderPage()} */}
      <Router>
          <NavTabs />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/homepage" component={Homepage} />
            <Route exact path="/profile/:username?" component={Profile} />
            <Route exact path="/character/:id" component={SingleCharacter} />
            <Route exact path="/campaigns" component={AllCampaigns} />
            <Route exact path="/resources" component={Resources} />
            <Route exact path="/post/:id" component={SinglePost} />

            <Route component={NoMatch} />
          </Switch>
        <Footer />
      </Router>
      

    </section>
  );
}
