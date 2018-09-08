import React from 'react';
import { Link, withRouter } from 'react-router-dom';

// libraries
import Auth from '../lib/Auth';

// const userId = Auth.currentUserId();

const Header = function() {
  return (
    <nav>
      {Auth.isAuthenticated() &&
      <div className="column column-1of3 centered-text">
        <Link to={`/users/${Auth.currentUserId()}`}>Profile</Link>
      </div>
      }
      <div className="column column-2of3 centered-text">
        <Link to="/users">Index</Link>
      </div>
      {Auth.isAuthenticated() &&
        <div className="column column-3of3 centered-text">
          <Link to={`/users/${Auth.currentUserId()}/chats`}>Inbox</Link>
        </div>
      }
    </nav>
  );
};

export default withRouter(Header);
