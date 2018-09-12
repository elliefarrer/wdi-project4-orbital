import React from 'react';

// libraries
import Auth from '../../lib/Auth';

const Location = ({ distance, postcode, user }) => {
  if(user !== Auth.currentUserId()) {
    return (
      <h4><i className="fas fa-map-marker-alt"></i>  {postcode[0].display_name.split(',')[0]}, {distance.route.distance.toFixed(0)} miles away</h4>
    );
  } else {
    return (
      <h4><i className="fas fa-map-marker-alt"></i>  {postcode[0].display_name.split(',')[0]}</h4>
    );
  }

};

export default Location;
