import React from "react";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6

const ViewText = ({ className, textBody }) => {
  return <ReactQuill className={className} readOnly value={textBody} />;
};

export default ViewText;
