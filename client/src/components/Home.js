import React from "react";
import NavBar from "./NavBar";
import homeImage from "../styles/images/homeimage.jpeg";
import "../styles/style.css";

function Home() {
  return (
    <>
      <NavBar />
      <div className="home-container">
        <div className="home-content">
          <img src={homeImage} alt="Matcha" className="home-image" />
          <div className="home-text">
            <h1>Welcome to Your Matcha Collection</h1>
            <p>Organize and explore your matcha collection with ease.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
