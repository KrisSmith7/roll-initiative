// import { render } from '@testing-library/react';
import React from 'react';
import logo from '../assets/socialrolls_logo.png';
// import axe from '../assets/axe.svg';
// import beer from '../assets/beer.svg';
// import books from '../assets/books.svg';
import Auth from '../utils/auth';

//create nav links at top of page that conditionally renders component based on selected link
function NavTabs({ currentPage, handlePageChange }) {

    return (     
        <>
            <div className="relative bg-charcoal ">
                <div className="flex flex-col sm:flex-row sm:justify-around">
                    <div className="w-72 h-screen">
                        <div className="flex items-center justify-start mx-6 mt-10">
                            <img className="h-10" src={logo}/>
                            <span className="text-gray-600 dark:text-gray-300 ml-4 text-2xl font-unicase font-bold">
                                Social Rolls
                            </span>
                        </div>
                        <nav className="mt-10 px-6 ">
                            <a className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg " href="#dashboard"
                                onClick={() => handlePageChange('Dashboard')}>
                                    {/* <img src={beer} /> */}
                                    <span className="mx-4 text-lg font-normal">
                                        Tavern Talk
                                    </span>
                                    <span className="flex-grow text-right">
                                    </span>
                            </a>
                            {Auth.loggedIn() ? (
                                <>
                                    <a className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-800 dark:text-gray-100 rounded-lg bg-gray-100 dark:bg-gray-600" href="#profile"
                                    onClick={() => handlePageChange('Profile')}>
                                        {/* <img src={axe}/> */}
                                        <span className="mx-4 text-lg font-normal">
                                            Characters and Quests
                                        </span>
                                        <span className="flex-grow text-right">
                                        </span>
                                    </a>
                                    <a className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg " href="#resources"
                                    onClick={() => handlePageChange('Resources')}>
                                        {/* <img src={books}/> */}
                                        <span className="mx-4 text-lg font-normal">
                                            Resources
                                        </span>
                                        <span className="flex-grow text-right">
                                        </span>
                                    </a>
                                    <div className="absolute bottom-0 my-10">
                                        <a className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200 flex items-center py-2 px-8" href="#homepage"
                                            onClick={() => {
                                                handlePageChange('Dashboard');
                                                Auth.logout();
                                                } }>
                                            <svg width="20" fill="currentColor" height="20" className="h-5 w-5" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1088 1256v240q0 16-12 28t-28 12h-240q-16 0-28-12t-12-28v-240q0-16 12-28t28-12h240q16 0 28 12t12 28zm316-600q0 54-15.5 101t-35 76.5-55 59.5-57.5 43.5-61 35.5q-41 23-68.5 65t-27.5 67q0 17-12 32.5t-28 15.5h-240q-15 0-25.5-18.5t-10.5-37.5v-45q0-83 65-156.5t143-108.5q59-27 84-56t25-76q0-42-46.5-74t-107.5-32q-65 0-108 29-35 25-107 115-13 16-31 16-12 0-25-8l-164-125q-13-10-15.5-25t5.5-28q160-266 464-266 80 0 161 31t146 83 106 127.5 41 158.5z">
                                                </path>
                                            </svg>
                                            <span className="mx-4 font-medium">
                                                Logout
                                            </span>
                                        </a>
                                    </div>
                                </>
                                
                            ) : (
                                <>
                                    <a className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg" 
                                    onClick={() => handlePageChange('Modal')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-door-open-fill" viewBox="0 0 16 16">
                                                <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
                                        </svg>
                                        <span className="mx-4 text-lg font-normal">
                                            Log In/ Sign Up
                                        </span>
                                        <span className="flex-grow text-right">
                                        </span>
                                    </a>
                                </>
                            )} 
                        </nav>
                    </div>
                </div>
            </div>
            
        </>  
    );
}

export default NavTabs;