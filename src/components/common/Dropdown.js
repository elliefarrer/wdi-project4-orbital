import React from 'react';
import { Link } from 'react-router-dom';

const Dropdown = ({ toggleNewChat, handleUnmatch, swipe }) => {
  return (
    <div className="dropdown">
      <div className="dropdown-option">
        <Link to={`/users/${swipe.userId._id}`}><i className="fas fa-info-circle"></i> <span>View profile</span></Link>
      </div>
      <div className="dropdown-option">
        <a id={swipe.userId._id} onClick={toggleNewChat}><i className="fas fa-comments" ></i> <span>Message</span> </a>
      </div>
      <div className="dropdown-option">
        <a onClick={handleUnmatch(swipe._id)}><i className="fas fa-times"></i> <span>Unmatch</span></a>
      </div>
    </div>
  );
};

export default Dropdown;
