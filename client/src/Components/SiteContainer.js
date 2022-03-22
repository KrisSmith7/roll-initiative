import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import NavTabs from './NavTabs';
import Footer from './Footer';
//import SiteTitle from './SiteTitle';
import Dashboard from './Pages/Dashboard';
import SinglePost from './Pages/SinglePost';
import NoMatch from './Pages/NoMatch';
import AllCampaigns from './Pages/AllCampaigns';
import Profile from './Pages/Profile';
import Resources from './Pages/Resources';
import SingleCharacter from './Pages/SingleCharacter';
import SingleCampaign from './Pages/SingleCampaign';
import PrivateProfile from './PrivateProfile';
import PrivateCampaigns from './PrivateCampaigns';
import PrivateCampaign from './PrivateCampaign';
// import PrivatePosts from './PrivatePosts'; 
//import Auth from '../utils/auth';

export default function SiteContainer() {

  return (
    <section className='overflow-auto h-screen w-full'>
      <Router>
          <NavTabs />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/dashboard" component={Dashboard} />
              <PrivateProfile path="/profile:username?">
                <Route exact path="/profile/:username?" component={Profile} />
              </PrivateProfile>
              <Route exact path="/character/:id" component={SingleCharacter} />
              <PrivateCampaigns path="/campaigns">
                <Route exact path="/campaigns" component={AllCampaigns} />
              </PrivateCampaigns>
              <PrivateCampaign path="/campaign/:id">
                <Route exact path="/campaign/:id" component={SingleCampaign} />
              </PrivateCampaign>
              <Route exact path="/resources" component={Resources} />
              {/* <PrivatePosts path="/post/:id"> */}
                <Route exact path="/post/:id" component={SinglePost} />
              {/* </PrivatePosts> */}
            <Route component={NoMatch} />
          </Switch>
        <Footer />
      </Router>
      

    </section>
  );
}
