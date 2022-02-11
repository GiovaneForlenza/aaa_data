import React, { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Data from "./pages/Data";
import History from "./pages/History";

function App() {
  const [selectedPage, setSelectedPage] = useState("home");

  return (
    <div className="App">
      <NavBar setSelectedPage={setSelectedPage} />
      {selectedPage === "home" ? (
        <Home />
      ) : selectedPage === "history" ? (
        <History />
      ) : (
        <Data />
      )}
    </div>
  );
}

export default App;
