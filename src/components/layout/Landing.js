import React from "react";
import white_logo from "../../images/facebook_cover_photo_1.png";

const Landing = () => {
  return (
    <div className="text-center mt-4">
      <img
        className="center-block"
        width="647px"
        style={{ marginRight: "149px" }}
        height="300px"
        src={white_logo}
        alt="Dev troops"
      />
    </div>
  );
};

export default Landing;
