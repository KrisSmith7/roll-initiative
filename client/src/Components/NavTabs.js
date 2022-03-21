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

//create nav links at top of page that conditionally renders component based on selected link
function NavTabs({ currentPage, handlePageChange }) {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  // console.log(currentPage);

  return (
    <div className="bg-gray-800 w-auto h-auto">
      <div className="">
        <button
          class="w-auto md:w-auto lg:w-auto flex items-center px-6 py-2.5 text-white font-infant uppercase active:bg-turq active:shadow-lg transition duration-150 ease-in-out"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
          aria-controls="offcanvasMenu"
        >
          <img src={logo} className="h-8" alt="20-sided die" />{" "}
          <span className="px-6 tracking-widest font-light text-xl">Menu</span>
        </button>
      </div>

      <div id="menu" className="collapse overflow-hidden  h-full">
        <button
          data-bs-toggle="collapse"
          data-bs-target="#menu"
          className="w-full relative left-36 text-5xl hover:text-white hover:text-7xl"
        >
          &times;
        </button>
        <div className="flex flex-col sm:flex-row sm:justify-around">
          <div className="w-72">
            <div className="flex items-center justify-start">
              <img className="h-10" src={logo} alt="social rolls logo" />
              <span className="text-gray-600 dark:text-gray-300 ml-4 text-2xl font-unicase font-bold">
                Social Rolls
              </span>
            </div>
            <nav>
              <Link to="/">
                <p className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg ">
                  <img src={beer} alt="Beer glasses" />
                  <span className="mx-4 text-lg font-cormorant">
                    Tavern Talk
                  </span>
                  <span className="flex-grow text-right"></span>
                </p>
              </Link>

              {Auth.loggedIn() ? (
                <>
                  <Link to="/profile">
                    <p className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg ">
                      <img src={axe} alt="axe" />
                      <span className="mx-4 text-lg font-cormorant">
                        Your Characters and Quests
                      </span>
                      <span className="flex-grow text-right"></span>
                    </p>
                  </Link>
                  <Link to="/campaigns">
                    <p className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg ">
                      <img src={search} alt="search icon" />
                      <span className="mx-4 text-lg font-cormorant">
                        Find a Campaign
                      </span>
                      <span className="flex-grow text-right"></span>
                    </p>
                  </Link>
                  <Link to="/resources">
                    <p className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg ">
                      <img src={books} alt="books" />
                      <span className="mx-4 text-lg font-cormorant">
                        Resources
                      </span>
                      <span className="flex-grow text-right"></span>
                    </p>
                  </Link>

                  {/* <div className="absolute bottom-0 my-10"> */}
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

      <div className="modal-container">
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
                  <div className="form">
                    <LoginForm />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="signup" className="tab-pane">
                  <div className="form">
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
