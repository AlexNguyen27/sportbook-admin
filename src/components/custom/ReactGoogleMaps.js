// import _ from "lodash";
// import React from "react";
// import { compose, withProps } from "recompose";
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker
// } from "react-google-maps";

// const MyMapComponent = compose(
//   withProps({
//     googleMapURL:
//       "https://www.google.com/maps/place/H%E1%BB%8Dc+vi%E1%BB%87n+C%C3%B4ng+ngh%E1%BB%87+B%C6%B0u+ch%C3%ADnh+Vi%E1%BB%85n+th%C3%B4ng+C%C6%A1+S%E1%BB%9F+T%E1%BA%A1i+TP.+H%E1%BB%93+Ch%C3%AD+Minh%C2%B7/@10.8478848,106.7839433,17z/data=!3m1!4b1!4m5!3m4!1s0x31752772b245dff1:0xb838977f3d419d!8m2!3d10.8478795!4d106.786132",
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `400px` }} />,
//     mapElement: <div style={{ height: `100%` }} />
//   }),
//   withScriptjs,
//   withGoogleMap
// )(props => (
//   <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
//     <Marker position={{ lat: -34.397, lng: 150.644 }} />
//   </GoogleMap>
// ));

// const enhance = _.identity;

// const ReactGoogleMaps = () => [
//   <MyMapComponent key="map" />
// ];

// export default enhance(ReactGoogleMaps);

import React from "react";

const ReactGoogleMaps = ({ address }) => {
  const addressQuery = encodeURIComponent(address) || "";
  // const addressQuery = 'H%E1%BB%8Dc%20vi%E1%BB%87n%20C%C3%B4ng%20ngh%E1%BB%87%20B%C6%B0u%20ch%C3%ADnh%20Vi%E1%BB%85n%20th%C3%B4ng%20C%C6%A1%20S%E1%BB%9F%20T%E1%BA%A1i%20TP.%20H%E1%BB%93%20Ch%C3%AD%20Minh%C2%B7'
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