import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Header = function() {
  return (
    <nav>
      <div className="column column-1of3 centered-text">
        <Link to="/users/:userId">Profile</Link>
      </div>
      <div className="column column-2of3 centered-text">
        <Link to="/users">Index</Link>
      </div>
      <div className="column column-3of3 centered-text">
        <Link to="/users/:userId/chats">Inbox</Link>
      </div>
    </nav>
  );
};

export default withRouter(Header);
