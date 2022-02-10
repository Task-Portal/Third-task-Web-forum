import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import "./Nav.css";
import Registration from "../auth/Registration";
import Login from "../auth/Login";
import Logout from "../auth/Logout";
import {useSelector} from "react-redux";
import {AppState} from "../../store/AppState";
import {faRegistered} from "@fortawesome/free-solid-svg-icons/faRegistered";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {faLock} from "@fortawesome/free-solid-svg-icons/faLock";
import {faLockOpen} from "@fortawesome/free-solid-svg-icons/faLockOpen";
import {faUserMinus} from "@fortawesome/free-solid-svg-icons/faUserMinus";
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import {Button} from "react-bootstrap";

const MyNav = () => {

    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const user = useSelector((state: AppState) => state.user);

    const onClickToggleLogout = () => {
        setShowLogout(!showLogout);
    };

    const onClickToggleRegister = () => {
        setShowRegister(!showRegister);
    };

    const onClickToggleLogin = () => {
        setShowLogin(!showLogin);
    };

    return (
        <Navbar bg="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#" style={{color: "whitesmoke"}}>Users</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                        {user ? (
                            <Nav.Link>
                                <FontAwesomeIcon icon={faUser} className="icon-fontAwesome"/>
                                <span className="menu-name ms-sm-1">{user?.userName}
                            </span>
                            </Nav.Link>
                        ) : null}

                        {user ? null : (
                            <Nav.Link>
                                <FontAwesomeIcon icon={faRegistered} className="icon-fontAwesome"/>
                                <span onClick={onClickToggleRegister} className="menu-name">
                              egister
                            </span>
                                <Registration
                                    isOpen={showRegister}
                                    onClickToggle={onClickToggleRegister}
                                />
                            </Nav.Link>
                        )}
                        {user ? null : (
                            <Nav.Link>
                                <FontAwesomeIcon icon={faSignInAlt} className="icon-fontAwesome"/>
                                <span onClick={onClickToggleLogin} className="menu-name">
                              ogin
                            </span>
                                <Login isOpen={showLogin} onClickToggle={onClickToggleLogin}/>
                            </Nav.Link>
                        )}
                        {user ? (
                            <Nav.Link>
                                <FontAwesomeIcon icon={faSignOutAlt} className="icon-fontAwesome"/>
                                <span onClick={onClickToggleLogout} className="menu-name">
                            logout
                          </span>
                                <Logout isOpen={showLogout} onClickToggle={onClickToggleLogout}/>
                            </Nav.Link>
                        ) : null}

                    </Nav>

                    {user ? (
                        <div className="d-flex">
                            <Button variant="outline-light" className="me-sm-1">
                                <FontAwesomeIcon icon={faLock} className="icon-fontAwesome"/>
                                Block
                            </Button>


                            <Button variant="outline-light" className="me-sm-1">
                                <FontAwesomeIcon icon={faLockOpen} className="icon-fontAwesome"/>
                                Unblock
                            </Button>

                            <Button variant="outline-light" className="me-sm-1">
                                <FontAwesomeIcon icon={faUserMinus} className="icon-fontAwesome"/>
                                Delete
                            </Button>

                        </div>
                    ) : null}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default MyNav;
