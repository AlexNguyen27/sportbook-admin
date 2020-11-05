import React from 'react';
import Colors from '../../constants/Colors';

const NotFound = ({ alertText, descriptionText, center }) => {
  return (
    <div className={`my-3 ${center ? 'text-center' : ''}`}>
      <h1 className="text" style={{ color: Colors.purple }}>
        <i className="fas fa-exclamation-triangle" />{' '}
        {alertText || 'Page Not Found'}
      </h1>

      <p> {descriptionText || 'Sorry, this page does not exists'}</p>
    </div>
  );
};

export default NotFound;
