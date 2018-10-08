import React from 'react';
import { Link } from 'react-router-dom';
import { login } from '../services/authService';

const HomePage = () => {
  async function exampleUserLogin() {
    await login("adam@example.com", "123456");
    window.location = "/users/me/show";
  }
  return(
    <React.Fragment>
      <div className="jumbotron custom-center">
        <h1 className="display-4">Welcome to WorkoutLogger!</h1>
        <p className="lead">
          This project provides users with a simple interface for creating,
          reviewing, updating and deleting workouts.
        </p>
        <hr className="my-4"/>
        <p>
          Click the register button to create a new account. Click the example
          button to skip registering and log in as an example user.
        </p>
        <Link
          to="/users/new"
          className="btn btn-danger btn-lg custom-right-margin">
          Register
        </Link>
        <button
          onClick={exampleUserLogin}
          className="btn btn-primary btn-lg">
          Example
        </button>
      </div>
      <div className="custom-flex-grow-column"/>
    </React.Fragment>
  );
};

export default HomePage;
