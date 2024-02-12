import React from "react";
import video from "../assets/Untitled2.mp4";

const HomePage = () => {
  return (
    <div className="background">
      <video autoPlay muted loop id="video-untitled2">
        <source src={video} type="video/mp4" />
      </video>
      <div className="content">
        <h1>Nomad notes</h1>
      </div>
    </div>
  );
};

export default HomePage;