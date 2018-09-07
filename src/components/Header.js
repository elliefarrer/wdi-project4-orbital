import React from 'react';

const Header = function() {
  return (
    <nav>
      <div className="column-1of3 ">
        <a className="centered-text">Profile</a>
      </div>
      <div className="column-2of3 centered-text">
        <a className="centered-text">Index</a>
      </div>
      <div className="column-3of3">
        <a className="centered-text">Inbox</a>
      </div>
    </nav>
  );
};

export default Header;
