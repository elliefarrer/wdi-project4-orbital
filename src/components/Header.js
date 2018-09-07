import React from 'react';

const Header = function() {
  return (
    <nav>
      <div className="column column-1of3 centered-text">
        <a>Profile</a>
      </div>
      <div className="column column-2of3 centered-text">
        <a>Index</a>
      </div>
      <div className="column column-3of3 centered-text">
        <a>Inbox</a>
      </div>
    </nav>
  );
};

export default Header;
