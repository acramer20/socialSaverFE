import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../forms/UserContext";
import "./Navigation.css";

/** Nav bar to show up on everypage for user's convenienve*/

function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);
  console.debug("Navigation", "currentUser=", currentUser);

  function loggedInNav() {
    return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/profile">
              Profile
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/groups">
              Groups
            </NavLink>
          </li>
          {currentUser.isAdmin && <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/members">
              Members
            </NavLink>
          </li>}
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={logout}>
              Log out {currentUser.first_name || currentUser.username}
            </Link>
          </li>
        </ul>
    );
  }

  function loggedOutNav() {
    return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/signup">
              Sign Up
            </NavLink>
          </li>
        </ul>
    );
  }

  return (
      <nav className="Navigation navbar navbar-expand-md">
        <Link className="navbar-brand home-title" to="/">
          Social Saver
        </Link>
        {currentUser ? loggedInNav() : loggedOutNav()}
      </nav>
  );
}

export default Navigation;
