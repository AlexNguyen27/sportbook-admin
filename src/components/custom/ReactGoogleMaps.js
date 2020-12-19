import React from "react";

const ReactGoogleMaps = ({ address }) => {
  const addressQuery = encodeURIComponent(address) || "";
  return (
    <div className="map-responsive">
      <iframe
        title="test"
        width="100%"
        style={{ borderRadius: "4px" }}
        height="400"
        frameborder="0"
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAEISduCZQJgYppXigB8wjsQhYSj1HIKEE&q=${addressQuery}`}
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default ReactGoogleMaps;