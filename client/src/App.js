import React, { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Data from "./pages/Data";
import History from "./pages/History";

function App() {
  const [selectedPage, setSelectedPage] = useState("home");

  const herokuURL = "https://aaa-data.herokuapp.com";
  return (
    <div className="App">
      <NavBar setSelectedPage={setSelectedPage} />
      {selectedPage === "home" ? (
        <Home herokuURL={herokuURL} />
      ) : selectedPage === "history" ? (
        <History herokuURL={herokuURL} />
      ) : (
        <Data herokuURL={herokuURL} />
      )}
    </div>
  );
}

export default App;
