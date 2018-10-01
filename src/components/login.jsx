import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Joi from 'joi-browser';
import { login, getCurrentUser } from '../services/authService';

class Login extends Component {
  state = {
    data: {
      username: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password")
  };

  async handleSubmit(event) {
    event.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) { return; }

    try {
      const { data } = this.state;
      await login(data.username, data.password);

      const { state }  = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch(exception) {
      if (exception.response && exception.response.state === 400){
        const errors = { ...this.state.errors };
        errors.username = exception.response.data;
        this.setState({ errors });
      }
    }
  }

  render() {
    if (getCurrentUser()) return <Redirect to="/" />;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <h4>Login</h4>
            <div className="form-group">
              <label htmlFor="inlineFormInputUsername">Username</label>
              <input
                name="username"
                type="text"
                className="form-control"
                id="inlineFormInputUsername"
                value={this.state.exercise.username}
                onChange={this.handleChange}
              />
              {this.state.errors.username && <div className="alert alert-danger">{this.state.errors.username}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="inlineFormInputPassword">Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="inlineFormInputPassword"
                value={this.state.exercise.password}
                onChange={this.handleChange}
              />
              {this.state.errors.password && <div className="alert alert-danger">{this.state.errors.password}</div>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
