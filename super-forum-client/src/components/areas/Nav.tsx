import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "./Nav.css";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import Button from "./main/Button";
import Registration from "../auth/Registration";
import Login from "../auth/Login";
import Logout from "../auth/Logout";
import {useSelector} from "react-redux";
import {AppState} from "../../store/AppState";
import {faRegistered} from "@fortawesome/free-solid-svg-icons/faRegistered";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";

const Nav = () => {

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



  return (<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <div className="container">
            <div className="navbar-brand" >Users</div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                    aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">


                {user ? (
                    <li className="nav_li">
                      <FontAwesomeIcon icon={faUser} className="icon-fontAwesome" />
                      <span className="menu-name">
                {/*    Todo change this line */}
                        <Link to={`/userprofile/${user?.id}`}>{user?.userName}</Link>
              </span>
                    </li>
                ) : null}

                {user ? null : (
                    <li className="nav_li" >
                      <FontAwesomeIcon icon={faRegistered} className="icon-fontAwesome" />
                      <span onClick={onClickToggleRegister} className="menu-name" >
                egister
              </span>
                      <Registration
                          isOpen={showRegister}
                          onClickToggle={onClickToggleRegister}
                      />
                    </li>
                )}

                {user ? null : (
                    <li className="nav_li">
                      <FontAwesomeIcon icon={faSignInAlt} className="icon-fontAwesome" />
                      <span onClick={onClickToggleLogin} className="menu-name">
                ogin
              </span>
                      <Login isOpen={showLogin} onClickToggle={onClickToggleLogin} />
                    </li>
                )}

                {user ? (
                    <li className="nav_li">
                      <FontAwesomeIcon icon={faSignOutAlt} className="icon-fontAwesome"  />
                      <span onClick={onClickToggleLogout} className="menu-name">
                logout
              </span>
                      <Logout isOpen={showLogout} onClickToggle={onClickToggleLogout} />
                    </li>
                ) : null}

              </ul>
            </div>
          </div>
        </nav>

  );
};

export default Nav;
