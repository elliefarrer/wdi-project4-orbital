import React from 'react';

const SwipeButtons = ({ handleSwipe, user }) => {
  return (
    <div className="buttons">
      <div className="column-1of2">
        <button name={user._id} value="left" onClick={handleSwipe}><i className="fas fa-times"></i></button>
      </div>
      <div className="column-2of2">
        <button name={user._id} value="right" onClick={handleSwipe}><i className="fas fa-heart"></i></button>
      </div>
    </div>
  );
};

export default SwipeButtons;
