import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
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
          <NavLink className="nav-item nav-link" to="/users/me/show">
            Show-User
          </NavLink>
          <NavLink className="nav-item nav-link" to="/users/index">
            Users
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
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
