import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import NavTabs from './NavTabs';
import Footer from './Footer';
import SiteTitle from './SiteTitle';
import Dashboard from './Pages/Dashboard';
import SinglePost from './Pages/SinglePost';
import NoMatch from './Pages/NoMatch';
import AllCampaigns from './Pages/AllCampaigns';
import Profile from './Pages/Profile';
import Resources from './Pages/Resources';
import SingleCharacter from './Pages/SingleCharacter';
import SingleCampaign from './Pages/SingleCampaign';
import Auth from '../utils/auth';

export default function SiteContainer() {
  
  // saved for putting into each component if we need
  // const [isRedirect, setRedirect] = useState(false);

  // if (Auth.isTokenExpired() || !Auth.loggedIn()) {
  //   setRedirect(true); 
  // }
  

  return (
    <section className='overflow-auto h-screen w-full'>
      {/* conditionally renders component based on value of the currentPage variable; calls the function */}
      {/* {renderPage()} */}
      <Router>
          <NavTabs />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/profile/:username?" component={Profile} />
              <Route exact path="/character/:id" component={SingleCharacter} />
              <Route exact path="/campaigns" component={AllCampaigns} />
              <Route exact path="/resources" component={Resources} />
              <Route exact path="/post/:id" component={SinglePost} />
              <Route exact path="/campaign/:id" component={SingleCampaign} />

            <Route component={NoMatch} />
          </Switch>
        <Footer />
      </Router>
      

    </section>
  );
}
