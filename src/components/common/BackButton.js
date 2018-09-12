import React from 'react';
import { Link } from 'react-router-dom';

const BackButton = ({ link }) => {
  return (
    <Link to={link}><i className="fas fa-angle-double-up over-image top-left"></i></Link>
  );
};

export default BackButton;
