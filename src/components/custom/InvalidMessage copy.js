import React from "react";

const InvalidMessage = ({ error }) => {
  return error && error !== "" ? (
    <div className="invalidFeedback">{error}</div>
  ) : null;
};

export default InvalidMessage;
