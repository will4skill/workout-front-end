import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';

const NavBar = () => {
  const user = getCurrentUser();


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link className="navbar-brand" to="/">WorkoutLogger</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="navbar-nav">
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/users/new">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
              <NavLink className="nav-item nav-link" to="/users/me/show">
                Profile
              </NavLink>
              <NavLink className="nav-item nav-link" to="/workouts/index">
                Workouts
              </NavLink>
              <NavLink className="nav-item nav-link" to="/exercises/index">
                Exercises
              </NavLink>
              <NavLink className="nav-item nav-link" to="/muscles/index">
                Muscles
              </NavLink>
            </React.Fragment>
          )}
          {user && user.admin && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/users/index">
                Users
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
