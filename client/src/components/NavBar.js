import React from "react";

import "../style/navbar.scss";

function NavBar({ setSelectedPage }) {
  return (
    <div className="navbar_container">
      <div className="buttons">
        <div
          className="button"
          onClick={() => {
            setSelectedPage("home");
          }}
        >
          Home
        </div>
        <div
          className="button"
          onClick={() => {
            setSelectedPage("history");
          }}
        >
          History
        </div>
        <div
          className="button"
          onClick={() => {
            setSelectedPage("data");
          }}
        >
          Data
        </div>
      </div>
    </div>
  );
}

export default NavBar;
