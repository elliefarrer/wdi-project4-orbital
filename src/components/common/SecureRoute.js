import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// libraries
import Auth from '../../lib/Auth';

const SecureRoute = (props) => {
  if(!Auth.isAuthenticated()) {
    return <Redirect to="/" />;
  }

  return (
    <Route {...props} />
  );
};

export default SecureRoute;
