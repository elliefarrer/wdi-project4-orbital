import React from 'react';

// libraries
import Auth from '../../lib/Auth';

const Location = ({ distance, postcode, user }) => {
  if(user !== Auth.currentUserId()) {
    return (
      <p><i className="fas fa-map-marker-alt"></i>  {postcode[0].display_name.split(',')[0]}, {distance.route.distance.toFixed(0)} miles away</p>
    );
  } else {
    return (
      <p><i className="fas fa-map-marker-alt"></i>  {postcode[0].display_name.split(',')[0]}</p>
    );
  }

};

export default Location;
