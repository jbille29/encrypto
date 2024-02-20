import React from 'react';
import './CircleProgress.css'; // Make sure to create this CSS file

const CircleProgress = ({ playsRemaining }) => {
  return (
    <div className="circle-progress">
      <div className="circle-inner">
        <div className="progress-text">{playsRemaining}%</div>
      </div>
      <div className="circle">
        <div className="mask full" style={{ transform: `rotate(${playsRemaining * 3.6}deg)` }}>
          <div className="fill" style={{ backgroundColor: playsRemaining > 50 ? 'green' : 'red' }}></div>
        </div>
        <div className="mask half">
          <div className="fill" style={{ backgroundColor: playsRemaining > 50 ? 'green' : 'red' }}></div>
        </div>
        <div className="inside-circle"></div>
      </div>
    </div>
  );
};

export default CircleProgress;
