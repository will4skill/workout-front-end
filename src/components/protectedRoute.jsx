import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  <Route
    { ...rest }
    render={ props => { getCurrentUser() ?
        <Component { ...props } /> :
        <Redirect to={{ pathname: "/login", state: { from: props.location }}} />
      }
    }
  />
};

export default ProtectedRoute
