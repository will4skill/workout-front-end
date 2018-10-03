import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';

class NavBar extends Component {
  state = {
    show: false
  };

  handleToggler = () => {
    const show = !this.state.show;
    this.setState({show});
  };

  render() {
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
          aria-label="Toggle navigation"
          onClick={this.handleToggler}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="navbar-collapse"
          id="navbarNav"
          display={this.state.show.toString()}
          >
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
  }
}

export default NavBar;
