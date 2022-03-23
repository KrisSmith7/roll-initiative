// import { render } from '@testing-library/react';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/socialrolls_logo.png";
import axe from "../assets/axe.svg";
import beer from "../assets/beer.svg";
import books from "../assets/books.svg";
import search from "../assets/search.svg";
import door from "../assets/door.svg";
import Auth from "../utils/auth";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { Modal, Nav, Tab } from "react-bootstrap";
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

//create nav links at top of page that conditionally renders component based on selected link
function NavTabs({ currentPage, handlePageChange }) {
 
  let me; 
  
  if(Auth.loggedIn()) {

    const profile = Auth.getProfile();
    me = profile.data; 
    console.log(me);
  } 


  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);


  return (
    <div className="bg-gray-800 h-auto w-screen absolute" style={{zIndex:30}}>
      <div className="flex justify-between">
        <button
          class="w-auto md:w-auto lg:w-auto flex items-center px-6 py-2.5 text-white font-infant uppercase active:bg-turq active:shadow-lg transition duration-150 ease-in-out"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
          aria-controls="offcanvasMenu"
        >
          <img id="die" src={logo} className="h-8" alt="20-sided die" />{" "}
          <span className="px-6 tracking-widest font-light text-xl">Menu</span>
        </button>
        {Auth.loggedIn() && <div className=" welcome flex items-center px-6 py-2.5 text-white font-infant text-xl"> <Link to="/profile"><p>Welcome, <span className="capitalize"> {me.username} </span>!</p></Link></div>}
      </div>

      <div id="menu" className="collapse overflow-hidden h-full">
      <button
          data-bs-toggle="collapse"
          data-bs-target="#menu"
          className="w-full text-right text-5xl px-4 hover:text-white hover:text-7xl"
          >
          &times;
          </button>
        <div className="flex md:flex-row justify-around">
          <div className="">
            <div className="flex ">
              <img className="h-10" src={logo} alt="social rolls logo" />
              <span className="text-gray-600 dark:text-gray-300 ml-4 text-2xl font-unicase font-bold">
                Social Rolls
              </span>
            </div>
            <nav className="flex flex-col md:flex-row justify-between">
                <button data-bs-toggle="collapse" data-bs-target="#menu">
                <Link to="/">
                    <p className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg ">
                    <img src={beer} alt="Beer glasses" />
                    <span className="mx-4 text-lg font-cormorant">
                        Tavern Talk
                    </span>
                    <span className="flex-grow text-right"></span>
                    </p>
                </Link>
                </button>

              {Auth.loggedIn() ? (
                <>
                  <button data-bs-toggle="collapse" data-bs-target="#menu">
                        <Link to="/profile">
                        <p className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg ">
                        <img src={axe} alt="axe" />
                        <span className="mx-4 text-lg font-cormorant">
                            Your Characters and Quests
                        </span>
                        <span className="flex-grow text-right"></span>
                        </p>
                    </Link>
                    </button>
                    <button data-bs-toggle="collapse" data-bs-target="#menu">
                  <Link to="/campaigns">
                    <p className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg ">
                      <img src={search} alt="search icon" />
                      <span className="mx-4 text-lg font-cormorant">
                        Find a Campaign
                      </span>
                      <span className="flex-grow text-right"></span>
                    </p>
                  </Link>
                      </button>
                  <button data-bs-toggle="collapse" data-bs-target="#menu">
                  <Link to="/resources">
                    <p className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg ">
                      <img src={books} alt="books" />
                      <span className="mx-4 text-lg font-cormorant">
                        Resources
                      </span>
                      <span className="flex-grow text-right"></span>
                    </p>
                  </Link>
                      </button>

          
                  <button data-bs-toggle="collapse" data-bs-target="#menu">
                  <Link to="/">
                    <p
                      className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                      href="#dashboard"
                      onClick={() => {
                        Auth.logout();
                      }}
                    >
                      <img src={door} alt="logout" />
                      <span className="mx-4 text-lg font-cormorant">
                        Logout
                      </span>
                    </p>
                  </Link>
                  </button>
                </>
              ) : (
                <>
                  <a
                    className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg"
                    href="#dashboard"
                    onClick={handleShow}
                  >
                    <img src={door} alt="login" />

                    <span className="mx-4 text-lg font-cormorant">
                      Log In/ Sign Up
                    </span>
                    <span className="flex-grow text-right"></span>
                  </a>
                </>
              )}
              
            </nav>
            
          </div>
          
        </div>
      
      </div>

      <div className="modal-container ">
        <Modal
          // {...props}
          size="lg"
          centered
          show={showModal}
          onHide={handleClose}
          ClassName="modal"
        >
          <Tab.Container defaultActiveKey="login">
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                <Nav variant="tabs">
                  <Nav.Item className="nav-tab">
                    <Nav.Link className="font-macondo nav-a" eventKey="login">
                      Login
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="nav-tab">
                    <Nav.Link className="font-macondo nav-a" eventKey="signup">
                      Sign Up
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="">
              <Tab.Content className="tab-content">
                <Tab.Pane eventKey="login" className="tab-pane">
                  <div className="form flex flex-col place-items-center">
                    <LoginForm />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="signup" className="tab-pane">
                  <div className="form flex flex-col place-items-center">
                    <SignUpForm />
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Modal.Body>
          </Tab.Container>
        </Modal>
      </div>
    </div>
  );
}

export default NavTabs;
