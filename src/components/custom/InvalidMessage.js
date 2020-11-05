import React from 'react';

const InvalidMessage = ({ error }) => {
  return error && error !== '' ? (
    <div className="invalidFeedback" style={{ color: 'red' }}>
      {error}
    </div>
  ) : null;
};

export default InvalidMessage;
