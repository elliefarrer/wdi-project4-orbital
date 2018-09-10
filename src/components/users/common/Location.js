import React from 'react';

const Location = (props) => {
  return (
    <p><i className="fas fa-map-marker-alt"></i>  {props.postcode[0].display_name.split(',')[0]}, {props.distance.route.distance.toFixed(0)} miles away</p>
  );
};

export default Location;
