import React from 'react';

const SwipeButtons = ({ handleSwipe, user }) => {
  return (
    <div className="buttons">
      <div className="column-1of2">
        <a name={user._id} value="left" onClick={handleSwipe}><i className="fas fa-times swipe-button swipe-left"></i></a>
      </div>
      <div className="column-2of2">
        <a name={user._id} value="right" onClick={handleSwipe}><i className="fas fa-heart swipe-button swipe-right"></i></a>
      </div>
    </div>
  );
};

export default SwipeButtons;
